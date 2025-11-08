import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-400 mb-8">
          La page que vous recherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
