'use client';

import { useState, FormEvent } from 'react';

export interface ConventionFiltersProps {
  onFiltersChange: (filters: FilterParams) => void;
  categories?: Array<{ id: string; name: string; slug: string }>;
}

export interface FilterParams {
  city?: string;
  region?: string;
  country?: string;
  categoryId?: string;
  categorySlug?: string;
  startDateAfter?: string;
  startDateBefore?: string;
  dateBetweenStart?: string;
  dateBetweenEnd?: string;
  upcoming?: boolean;
  popular?: boolean;
  verified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default function ConventionFilters({ onFiltersChange, categories = [] }: ConventionFiltersProps) {
  const [filters, setFilters] = useState<FilterParams>({
    page: 1,
    limit: 12,
    sortBy: 'startDate',
    sortOrder: 'asc',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (key: keyof FilterParams, value: any) => {
    const newFilters = { ...filters, [key]: value === '' ? undefined : value, page: 1 };
    setFilters(newFilters);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterParams = {
      page: 1,
      limit: 12,
      sortBy: 'startDate',
      sortOrder: 'asc',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recherche textuelle */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
            Recherche
          </label>
          <input
            type="text"
            id="search"
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
            placeholder="Rechercher une convention..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
          />
        </div>

        {/* Filtres principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ville */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
              Ville
            </label>
            <input
              type="text"
              id="city"
              value={filters.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Paris, Lyon..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
            />
          </div>

          {/* Région */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
              Région
            </label>
            <input
              type="text"
              id="region"
              value={filters.region || ''}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="Île-de-France..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Catégorie
            </label>
            <select
              id="category"
              value={filters.categoryId || ''}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtres rapides */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const newFilters = { ...filters, upcoming: !filters.upcoming, page: 1 };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.upcoming
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
            }`}
          >
            À venir
          </button>
          <button
            type="button"
            onClick={() => {
              const newFilters = { ...filters, popular: !filters.popular, page: 1 };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.popular
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
            }`}
          >
            Populaires
          </button>
          <button
            type="button"
            onClick={() => {
              const newFilters = { ...filters, verified: !filters.verified, page: 1 };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.verified
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
            }`}
          >
            Vérifiées
          </button>
        </div>

        {/* Filtres avancés */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors"
          >
            {showAdvanced ? '▼' : '▶'} Filtres avancés
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 pt-4 border-t border-gray-700">
              {/* Dates - À partir de */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDateAfter" className="block text-sm font-medium text-gray-300 mb-2">
                    Date de début après
                  </label>
                  <input
                    type="date"
                    id="startDateAfter"
                    value={filters.startDateAfter || ''}
                    onChange={(e) => handleInputChange('startDateAfter', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Dates - Avant */}
                <div>
                  <label htmlFor="startDateBefore" className="block text-sm font-medium text-gray-300 mb-2">
                    Date de début avant
                  </label>
                  <input
                    type="date"
                    id="startDateBefore"
                    value={filters.startDateBefore || ''}
                    onChange={(e) => handleInputChange('startDateBefore', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Entre deux dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateBetweenStart" className="block text-sm font-medium text-gray-300 mb-2">
                    Période - Du
                  </label>
                  <input
                    type="date"
                    id="dateBetweenStart"
                    value={filters.dateBetweenStart || ''}
                    onChange={(e) => handleInputChange('dateBetweenStart', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="dateBetweenEnd" className="block text-sm font-medium text-gray-300 mb-2">
                    Période - Au
                  </label>
                  <input
                    type="date"
                    id="dateBetweenEnd"
                    value={filters.dateBetweenEnd || ''}
                    onChange={(e) => handleInputChange('dateBetweenEnd', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Pays */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  value={filters.country || ''}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="France..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
                />
              </div>

              {/* Tri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-2">
                    Trier par
                  </label>
                  <select
                    id="sortBy"
                    value={filters.sortBy || 'startDate'}
                    onChange={(e) => handleInputChange('sortBy', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="startDate">Date de début</option>
                    <option value="endDate">Date de fin</option>
                    <option value="name">Nom</option>
                    <option value="city">Ville</option>
                    <option value="createdAt">Date de création</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-300 mb-2">
                    Ordre
                  </label>
                  <select
                    id="sortOrder"
                    value={filters.sortOrder || 'asc'}
                    onChange={(e) => handleInputChange('sortOrder', e.target.value as 'asc' | 'desc')}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Appliquer les filtres
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium border border-gray-600"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}
