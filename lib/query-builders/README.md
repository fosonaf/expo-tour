# Convention Query Builder

Le `ConventionQueryBuilder` permet de construire des requêtes Prisma de manière fluide et type-safe pour filtrer les conventions.

## Utilisation de base

```typescript
import { ConventionQueryBuilder } from '@/lib/query-builders/convention-query-builder';

const queryBuilder = new ConventionQueryBuilder();

const where = queryBuilder
  .filterByCity('Paris')
  .filterByCountry('France')
  .filterUpcoming()
  .build();

const conventions = await prisma.convention.findMany({ where });
```

## Filtres de localisation

### Par ville
```typescript
queryBuilder.filterByCity('Paris');
// Recherche insensible à la casse
```

### Par région
```typescript
queryBuilder.filterByRegion('Île-de-France');
```

### Par pays
```typescript
queryBuilder.filterByCountry('France');
```

### Par code postal
```typescript
queryBuilder.filterByPostalCode('75015');
```

## Filtres de dates

### À partir d'une date
```typescript
// Conventions dont la date de début est après le 1er janvier 2024
queryBuilder.filterByStartDateAfter('2024-01-01');
// ou
queryBuilder.filterByStartDateAfter(new Date('2024-01-01'));
```

### Avant une date
```typescript
// Conventions dont la date de début est avant le 31 décembre 2024
queryBuilder.filterByStartDateBefore('2024-12-31');
```

### Entre deux dates
```typescript
// Conventions qui ont lieu entre deux dates (chevauchent la période)
queryBuilder.filterByDateBetween('2024-06-01', '2024-08-31');
```

### Filtres combinés sur les dates
```typescript
queryBuilder
  .filterByStartDateAfter('2024-01-01')
  .filterByEndDateBefore('2024-12-31');
```

### Conventions à venir
```typescript
queryBuilder.filterUpcoming();
// Équivalent à: startDate >= maintenant
```

### Conventions passées
```typescript
queryBuilder.filterPast();
// Équivalent à: endDate < maintenant
```

## Autres filtres

### Par catégorie (ID)
```typescript
queryBuilder.filterByCategoryId('category-id-123');
```

### Par catégorie (slug)
```typescript
queryBuilder.filterByCategorySlug('jeux-video-geek');
```

### Conventions populaires
```typescript
queryBuilder.filterPopular(true);  // Seulement populaires
queryBuilder.filterPopular(false); // Seulement non-populaires
```

### Conventions vérifiées
```typescript
queryBuilder.filterVerified(true);  // Seulement vérifiées
queryBuilder.filterVerified(false); // Seulement non-vérifiées
```

### Recherche textuelle
```typescript
queryBuilder.search('Japan Expo');
// Recherche dans name et description
```

## Utilisation avec filtres

Vous pouvez passer un objet de filtres :

```typescript
import { ConventionFilters } from '@/lib/query-builders/convention-query-builder';

const filters: ConventionFilters = {
  city: 'Paris',
  country: 'France',
  startDateAfter: '2024-01-01',
  dateBetween: {
    start: '2024-06-01',
    end: '2024-08-31',
  },
  isPopular: true,
  search: 'Japan',
};

const queryBuilder = new ConventionQueryBuilder();
queryBuilder.applyFilters(filters);

const where = queryBuilder.build();
```

## Exemples d'API

### Rechercher les conventions à Paris
```
GET /api/conventions?city=Paris
```

### Conventions à venir dans une région
```
GET /api/conventions?region=Île-de-France&upcoming=true
```

### Conventions après une date
```
GET /api/conventions?startDateAfter=2024-06-01
```

### Conventions avant une date
```
GET /api/conventions?startDateBefore=2024-12-31
```

### Conventions entre deux dates
```
GET /api/conventions?dateBetweenStart=2024-06-01&dateBetweenEnd=2024-08-31
```

### Combinaison de filtres
```
GET /api/conventions?city=Paris&country=France&startDateAfter=2024-01-01&isPopular=true
```

### Recherche textuelle
```
GET /api/conventions?search=Japan
```

### Pagination
```
GET /api/conventions?page=1&limit=20
```

### Tri
```
GET /api/conventions?sortBy=startDate&sortOrder=asc
GET /api/conventions?sortBy=name&sortOrder=desc
```

## Réponse API

```json
{
  "data": [
    {
      "id": "...",
      "name": "...",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

