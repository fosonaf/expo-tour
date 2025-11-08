'use client';

import Link from 'next/link';
import { Convention } from '@/types/convention';

interface ConventionListProps {
  conventions: Convention[];
  isLoading?: boolean;
}

export default function ConventionList({ conventions, isLoading }: ConventionListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (conventions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-12 text-center border border-gray-700">
        <p className="text-gray-300 text-lg">Aucune convention trouvée.</p>
        <p className="text-gray-500 text-sm mt-2">Essayez de modifier vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conventions.map((convention) => (
        <Link
          key={convention.id}
          href={`/conventions/${convention.slug}`}
          className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:border-primary-500 transition-all p-6 border border-gray-700 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-primary-900 text-primary-200 text-sm font-medium rounded-full border border-primary-700">
              {convention.category.name}
            </span>
            {convention.isVerified && (
              <span className="text-green-400" title="Vérifié">
                ✓
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {convention.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            📍 {convention.city}
            {convention.region && `, ${convention.region}`} - {convention.country}
          </p>
          <p className="text-gray-500 text-sm mb-4">
            📅 {new Date(convention.startDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            {convention.endDate &&
              new Date(convention.endDate).getTime() !== new Date(convention.startDate).getTime() && (
                <span>
                  {' - '}
                  {new Date(convention.endDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              )}
          </p>
          {convention.description && (
            <p className="text-gray-400 text-sm line-clamp-2">{convention.description}</p>
          )}
          {convention.price && (
            <p className="text-primary-400 text-sm font-medium mt-2">{convention.price}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
