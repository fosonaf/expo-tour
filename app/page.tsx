import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Récupérer les catégories et quelques conventions populaires
  let categories = [];
  let upcomingConventions = [];

  try {
    categories = await prisma.category.findMany({
      include: {
        conventions: {
          where: { isPopular: true },
          take: 3,
          orderBy: { startDate: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    upcomingConventions = await prisma.convention.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        category: true,
      },
      take: 6,
      orderBy: { startDate: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    // En cas d'erreur (ex: DB non configurée), on continue avec des tableaux vides
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Expo Tour</h1>
          <p className="text-gray-600 mt-2">Répertoire des conventions et salons</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Découvrez les conventions et salons
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez des centaines de conventions et salons par catégorie, 
            des grands événements aux salons locaux.
          </p>
        </div>

        {/* Prochaines conventions */}
        {upcomingConventions.length > 0 && (
          <section className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Prochaines conventions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingConventions.map((convention) => (
                <Link
                  key={convention.id}
                  href={`/conventions/${convention.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {convention.category.name}
                    </span>
                    {convention.isVerified && (
                      <span className="text-green-500" title="Vérifié">✓</span>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {convention.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {convention.city} - {convention.country}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(convention.startDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {convention.endDate && new Date(convention.endDate).getTime() !== new Date(convention.startDate).getTime() && (
                      <span>
                        {' - '}
                        {new Date(convention.endDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Catégories */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Par catégorie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h4>
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                )}
                <p className="text-blue-600 text-sm font-medium">
                  {category.conventions.length} convention{category.conventions.length > 1 ? 's' : ''} populaire{category.conventions.length > 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

