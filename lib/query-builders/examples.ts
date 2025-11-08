/**
 * Exemples d'utilisation du ConventionQueryBuilder
 * Ce fichier sert de référence et peut être supprimé en production
 */

import { ConventionQueryBuilder } from './convention-query-builder';
import { prisma } from '@/lib/prisma';

// Exemple 1: Rechercher les conventions à Paris
export async function getConventionsInParis() {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder.filterByCity('Paris').build();

  return await prisma.convention.findMany({ where });
}

// Exemple 2: Conventions à venir dans une région
export async function getUpcomingConventionsInRegion(region: string) {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByRegion(region)
    .filterUpcoming()
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 3: Conventions après une date spécifique
export async function getConventionsAfterDate(date: Date) {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByStartDateAfter(date)
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 4: Conventions avant une date spécifique
export async function getConventionsBeforeDate(date: Date) {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByStartDateBefore(date)
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 5: Conventions entre deux dates
export async function getConventionsBetweenDates(start: Date, end: Date) {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByDateBetween(start, end)
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 6: Conventions populaires à Paris à venir
export async function getPopularUpcomingConventionsInParis() {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByCity('Paris')
    .filterPopular(true)
    .filterUpcoming()
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 7: Recherche complexe avec plusieurs filtres
export async function getComplexSearch() {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .filterByCountry('France')
    .filterByStartDateAfter(new Date('2024-06-01'))
    .filterByEndDateBefore(new Date('2024-12-31'))
    .filterVerified(true)
    .search('Japan')
    .build();

  return await prisma.convention.findMany({
    where,
    include: { category: true },
    orderBy: { startDate: 'asc' },
  });
}

// Exemple 8: Utilisation avec filtres
export async function getConventionsWithFilters() {
  const queryBuilder = new ConventionQueryBuilder();
  const where = queryBuilder
    .applyFilters({
      city: 'Paris',
      country: 'France',
      startDateAfter: '2024-01-01',
      dateBetween: {
        start: '2024-06-01',
        end: '2024-08-31',
      },
      isPopular: true,
      search: 'Expo',
    })
    .build();

  return await prisma.convention.findMany({ where });
}

// Exemple 9: Conventions dans une période avec localisation
export async function getConventionsInPeriodAndLocation(
  startDate: Date,
  endDate: Date,
  city?: string,
  region?: string
) {
  const queryBuilder = new ConventionQueryBuilder();
  
  queryBuilder.filterByDateBetween(startDate, endDate);
  
  if (city) {
    queryBuilder.filterByCity(city);
  }
  
  if (region) {
    queryBuilder.filterByRegion(region);
  }

  const where = queryBuilder.build();

  return await prisma.convention.findMany({
    where,
    include: { category: true },
    orderBy: { startDate: 'asc' },
  });
}


