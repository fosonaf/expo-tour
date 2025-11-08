import { Prisma } from '@prisma/client';

export interface ConventionFilters {
  // Localisation
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  
  // Dates
  startDateAfter?: Date | string;
  startDateBefore?: Date | string;
  endDateAfter?: Date | string;
  endDateBefore?: Date | string;
  dateBetween?: {
    start: Date | string;
    end: Date | string;
  };
  
  // Autres filtres
  categoryId?: string;
  categorySlug?: string;
  isPopular?: boolean;
  isVerified?: boolean;
  search?: string; // Recherche textuelle dans name/description
}

export class ConventionQueryBuilder {
  private where: Prisma.ConventionWhereInput = {};

  /**
   * Filtre par ville (recherche insensible à la casse)
   */
  filterByCity(city: string): this {
    if (city) {
      this.where.city = {
        contains: city,
        mode: 'insensitive',
      };
    }
    return this;
  }

  /**
   * Filtre par région (recherche insensible à la casse)
   */
  filterByRegion(region: string): this {
    if (region) {
      this.where.region = {
        contains: region,
        mode: 'insensitive',
      };
    }
    return this;
  }

  /**
   * Filtre par pays (recherche insensible à la casse)
   */
  filterByCountry(country: string): this {
    if (country) {
      this.where.country = {
        contains: country,
        mode: 'insensitive',
      };
    }
    return this;
  }

  /**
   * Filtre par code postal
   */
  filterByPostalCode(postalCode: string): this {
    if (postalCode) {
      this.where.postalCode = postalCode;
    }
    return this;
  }

  /**
   * Filtre les conventions dont la date de début est après la date donnée
   */
  filterByStartDateAfter(date: Date | string): this {
    if (date) {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      this.where.startDate = {
        ...(this.where.startDate as Prisma.DateTimeFilter | undefined),
        gte: dateObj,
      };
    }
    return this;
  }

  /**
   * Filtre les conventions dont la date de début est avant la date donnée
   */
  filterByStartDateBefore(date: Date | string): this {
    if (date) {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      this.where.startDate = {
        ...(this.where.startDate as Prisma.DateTimeFilter | undefined),
        lte: dateObj,
      };
    }
    return this;
  }

  /**
   * Filtre les conventions dont la date de fin est après la date donnée
   */
  filterByEndDateAfter(date: Date | string): this {
    if (date) {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      this.where.endDate = {
        ...(this.where.endDate as Prisma.DateTimeFilter | undefined),
        gte: dateObj,
      };
    }
    return this;
  }

  /**
   * Filtre les conventions dont la date de fin est avant la date donnée
   */
  filterByEndDateBefore(date: Date | string): this {
    if (date) {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      this.where.endDate = {
        ...(this.where.endDate as Prisma.DateTimeFilter | undefined),
        lte: dateObj,
      };
    }
    return this;
  }

  /**
   * Filtre les conventions qui ont lieu entre deux dates
   * (la convention doit chevaucher la période donnée)
   */
  filterByDateBetween(start: Date | string, end: Date | string): this {
    if (start && end) {
      const startDate = typeof start === 'string' ? new Date(start) : start;
      const endDate = typeof end === 'string' ? new Date(end) : end;
      
      // Une convention chevauche la période si:
      // - sa date de début est avant ou égale à la fin de la période
      // - sa date de fin est après ou égale au début de la période
      this.where.AND = [
        ...(this.where.AND || []),
        {
          startDate: {
            lte: endDate,
          },
        },
        {
          endDate: {
            gte: startDate,
          },
        },
      ];
    }
    return this;
  }

  /**
   * Filtre les conventions à venir (date de début >= maintenant)
   */
  filterUpcoming(): this {
    this.where.startDate = {
      ...(this.where.startDate as Prisma.DateTimeFilter | undefined),
      gte: new Date(),
    };
    return this;
  }

  /**
   * Filtre les conventions passées (date de fin < maintenant)
   */
  filterPast(): this {
    this.where.endDate = {
      ...(this.where.endDate as Prisma.DateTimeFilter | undefined),
      lt: new Date(),
    };
    return this;
  }

  /**
   * Filtre par catégorie (ID)
   */
  filterByCategoryId(categoryId: string): this {
    if (categoryId) {
      this.where.categoryId = categoryId;
    }
    return this;
  }

  /**
   * Filtre par catégorie (slug)
   */
  filterByCategorySlug(categorySlug: string): this {
    if (categorySlug) {
      this.where.category = {
        slug: categorySlug,
      };
    }
    return this;
  }

  /**
   * Filtre les conventions populaires
   */
  filterPopular(isPopular: boolean = true): this {
    this.where.isPopular = isPopular;
    return this;
  }

  /**
   * Filtre les conventions vérifiées
   */
  filterVerified(isVerified: boolean = true): this {
    this.where.isVerified = isVerified;
    return this;
  }

  /**
   * Recherche textuelle dans le nom et la description
   */
  search(search: string): this {
    if (search) {
      this.where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }
    return this;
  }

  /**
   * Applique tous les filtres depuis un objet de filtres
   */
  applyFilters(filters: ConventionFilters): this {
    // Localisation
    if (filters.city) this.filterByCity(filters.city);
    if (filters.region) this.filterByRegion(filters.region);
    if (filters.country) this.filterByCountry(filters.country);
    if (filters.postalCode) this.filterByPostalCode(filters.postalCode);

    // Dates
    if (filters.startDateAfter) this.filterByStartDateAfter(filters.startDateAfter);
    if (filters.startDateBefore) this.filterByStartDateBefore(filters.startDateBefore);
    if (filters.endDateAfter) this.filterByEndDateAfter(filters.endDateAfter);
    if (filters.endDateBefore) this.filterByEndDateBefore(filters.endDateBefore);
    if (filters.dateBetween) {
      this.filterByDateBetween(filters.dateBetween.start, filters.dateBetween.end);
    }

    // Autres filtres
    if (filters.categoryId) this.filterByCategoryId(filters.categoryId);
    if (filters.categorySlug) this.filterByCategorySlug(filters.categorySlug);
    if (filters.isPopular !== undefined) this.filterPopular(filters.isPopular);
    if (filters.isVerified !== undefined) this.filterVerified(filters.isVerified);
    if (filters.search) this.search(filters.search);

    return this;
  }

  /**
   * Retourne l'objet where pour Prisma
   */
  build(): Prisma.ConventionWhereInput {
    return this.where;
  }

  /**
   * Réinitialise le builder
   */
  reset(): this {
    this.where = {};
    return this;
  }
}


