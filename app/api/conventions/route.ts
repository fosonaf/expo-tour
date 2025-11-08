import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
    const categoryId = searchParams.get('categoryId');
    const city = searchParams.get('city');
    const upcoming = searchParams.get('upcoming') === 'true';
    const popular = searchParams.get('popular') === 'true';

    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (upcoming) {
      where.startDate = { gte: new Date() };
    }

    if (popular) {
      where.isPopular = true;
    }

    const conventions = await prisma.convention.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { startDate: 'asc' },
    });

    return NextResponse.json(conventions);
  } catch (error) {
    console.error('Error fetching conventions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conventions' },
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

