import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ConventionPage({
  params,
}: {
  params: { slug: string };
}) {
  const convention = await prisma.convention.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
    },
  });

  if (!convention) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-primary-400 hover:text-primary-300 mb-4 inline-block transition-colors">
            ← Retour à l'accueil
          </Link>
          <Link 
            href={`/categories/${convention.category.slug}`}
            className="text-primary-400 hover:text-primary-300 mb-4 inline-block ml-4 transition-colors"
          >
            ← {convention.category.name}
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <span className="px-4 py-2 bg-primary-900 text-primary-200 text-sm font-medium rounded-full border border-primary-700">
              {convention.category.name}
            </span>
            {convention.isVerified && (
              <span className="text-green-400 font-medium" title="Convention vérifiée">
                ✓ Vérifiée
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            {convention.name}
          </h1>

          {convention.description && (
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {convention.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                📅 Dates
              </h3>
              <p className="text-white">
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
                      year: 'numeric',
                    })}
                  </span>
                )}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                📍 Localisation
              </h3>
              <p className="text-white">
                {convention.address && `${convention.address}, `}
                {convention.postalCode && `${convention.postalCode} `}
                {convention.city}
                {convention.region && `, ${convention.region}`}
                {', '}
                {convention.country}
              </p>
            </div>

            {convention.price && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  💰 Prix
                </h3>
                <p className="text-primary-400 font-medium">{convention.price}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {convention.website && (
              <a
                href={convention.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Site web
              </a>
            )}
            {convention.ticketUrl && (
              <a
                href={convention.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Acheter des billets
              </a>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
