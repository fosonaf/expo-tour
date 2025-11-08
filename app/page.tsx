'use client';

import { useState, useEffect } from 'react';
import ConventionFilters, { FilterParams } from '@/components/ConventionFilters';
import ConventionList from '@/components/ConventionList';
import Pagination from '@/components/Pagination';
import { ConventionResponse, Convention, Category } from '@/types/convention';

export default function Home() {
  const [conventions, setConventions] = useState<Convention[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterParams>({
    page: 1,
    limit: 12,
    sortBy: 'startDate',
    sortOrder: 'asc',
    upcoming: true, // Par défaut, on affiche les conventions à venir
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  // Charger les catégories au montage
  useEffect(() => {
    fetchCategories();
  }, []);

  // Charger les conventions quand les filtres changent
  useEffect(() => {
    fetchConventions();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchConventions = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Ajouter les filtres aux paramètres
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'upcoming' || key === 'popular' || key === 'verified') {
            if (value === true) {
              params.append(key, 'true');
            }
          } else {
            params.append(key, String(value));
          }
        }
      });

      const response = await fetch(`/api/conventions?${params.toString()}`);
      if (response.ok) {
        const data: ConventionResponse = await response.json();
        setConventions(data.data);
        setPagination(data.pagination);
      } else {
        console.error('Error fetching conventions');
      }
    } catch (error) {
      console.error('Error fetching conventions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white mb-2">Expo Tour</h1>
          <p className="text-gray-400">Répertoire des conventions et salons</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Découvrez les conventions et salons
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explorez des centaines de conventions et salons par catégorie, 
            des grands événements aux salons locaux.
          </p>
        </div>

        {/* Filtres */}
        <ConventionFilters
          onFiltersChange={handleFiltersChange}
          categories={categories}
        />

        {/* Résultats */}
        {pagination.total > 0 && (
          <div className="mb-4 text-sm text-gray-400">
            {pagination.total} convention{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
          </div>
        )}

        <ConventionList conventions={conventions} isLoading={isLoading} />

        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
