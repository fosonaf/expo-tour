import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { ConventionQueryBuilder, ConventionFilters } from '@/lib/query-builders/convention-query-builder';

const conventionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  city: z.string().min(1),
  region: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().default('France'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  website: z.string().url().optional(),
  ticketUrl: z.string().url().optional(),
  price: z.string().optional(),
  isPopular: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
  categoryId: z.string().min(1),
});

// GET - Récupérer toutes les conventions avec filtres
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Construction des filtres
    const filters: ConventionFilters = {};

    // Filtres de localisation
    const city = searchParams.get('city');
    const region = searchParams.get('region');
    const country = searchParams.get('country');
    const postalCode = searchParams.get('postalCode');

    if (city) filters.city = city;
    if (region) filters.region = region;
    if (country) filters.country = country;
    if (postalCode) filters.postalCode = postalCode;

    // Filtres de dates
    const startDateAfter = searchParams.get('startDateAfter');
    const startDateBefore = searchParams.get('startDateBefore');
    const endDateAfter = searchParams.get('endDateAfter');
    const endDateBefore = searchParams.get('endDateBefore');
    const dateBetweenStart = searchParams.get('dateBetweenStart');
    const dateBetweenEnd = searchParams.get('dateBetweenEnd');

    if (startDateAfter) filters.startDateAfter = startDateAfter;
    if (startDateBefore) filters.startDateBefore = startDateBefore;
    if (endDateAfter) filters.endDateAfter = endDateAfter;
    if (endDateBefore) filters.endDateBefore = endDateBefore;
    if (dateBetweenStart && dateBetweenEnd) {
      filters.dateBetween = {
        start: dateBetweenStart,
        end: dateBetweenEnd,
      };
    }

    // Autres filtres
    const categoryId = searchParams.get('categoryId');
    const categorySlug = searchParams.get('categorySlug');
    const upcoming = searchParams.get('upcoming') === 'true';
    const past = searchParams.get('past') === 'true';
    const popular = searchParams.get('popular');
    const verified = searchParams.get('verified');
    const search = searchParams.get('search');

    if (categoryId) filters.categoryId = categoryId;
    if (categorySlug) filters.categorySlug = categorySlug;
    if (popular !== null) filters.isPopular = popular === 'true';
    if (verified !== null) filters.isVerified = verified === 'true';
    if (search) filters.search = search;

    // Utilisation du QueryBuilder
    const queryBuilder = new ConventionQueryBuilder();
    
    // Appliquer les filtres
    queryBuilder.applyFilters(filters);
    
    // Filtres spéciaux (upcoming/past)
    if (upcoming) {
      queryBuilder.filterUpcoming();
    }
    if (past) {
      queryBuilder.filterPast();
    }

    // Paramètres de pagination et tri
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    const sortBy = searchParams.get('sortBy') || 'startDate';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';

    // Construction du orderBy de manière type-safe
    let orderBy: any = { startDate: 'asc' };
    
    switch (sortBy) {
      case 'startDate':
        orderBy = { startDate: sortOrder };
        break;
      case 'endDate':
        orderBy = { endDate: sortOrder };
        break;
      case 'name':
        orderBy = { name: sortOrder };
        break;
      case 'city':
        orderBy = { city: sortOrder };
        break;
      case 'createdAt':
        orderBy = { createdAt: sortOrder };
        break;
      default:
        orderBy = { startDate: 'asc' };
    }

    const conventions = await prisma.convention.findMany({
      where: queryBuilder.build(),
      include: {
        category: true,
      },
      orderBy,
      skip,
      take: limit,
    });

    // Compter le total pour la pagination
    const total = await prisma.convention.count({
      where: queryBuilder.build(),
    });

    return NextResponse.json({
      data: conventions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching conventions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conventions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle convention
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = conventionSchema.parse(body);

    // Vérifier que la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Vérifier que le slug n'existe pas déjà
    const existing = await prisma.convention.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Convention with this slug already exists' },
        { status: 409 }
      );
    }

    const convention = await prisma.convention.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(convention, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating convention:', error);
    return NextResponse.json(
      { error: 'Failed to create convention' },
      { status: 500 }
    );
  }
}

