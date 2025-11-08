import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      conventions: {
        orderBy: { startDate: 'asc' },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const now = new Date();
  const upcomingConventions = category.conventions.filter(
    (c) => new Date(c.startDate) >= now
  );
  const pastConventions = category.conventions.filter(
    (c) => new Date(c.startDate) < now
  );

  return (
    <main className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-primary-400 hover:text-primary-300 mb-4 inline-block transition-colors">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          {category.description && (
            <p className="text-gray-400 mt-2">{category.description}</p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {upcomingConventions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Prochaines conventions ({upcomingConventions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingConventions.map((convention) => (
                <Link
                  key={convention.id}
                  href={`/conventions/${convention.slug}`}
                  className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:border-primary-500 transition-all p-6 border border-gray-700 group"
                >
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {convention.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    📍 {convention.city} - {convention.country}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    📅 {new Date(convention.startDate).toLocaleDateString('fr-FR', {
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
                  {convention.description && (
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {convention.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {pastConventions.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Conventions passées ({pastConventions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastConventions.map((convention) => (
                <Link
                  key={convention.id}
                  href={`/conventions/${convention.slug}`}
                  className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all p-6 border border-gray-700 opacity-60"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {convention.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    📍 {convention.city} - {convention.country}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📅 {new Date(convention.startDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {category.conventions.length === 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-12 text-center border border-gray-700">
            <p className="text-gray-400">
              Aucune convention dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
