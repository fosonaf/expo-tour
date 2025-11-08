import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Créer les catégories
  const geekCategory = await prisma.category.upsert({
    where: { slug: 'jeux-video-geek' },
    update: {},
    create: {
      name: 'Jeux Vidéo / Geek',
      slug: 'jeux-video-geek',
      description: 'Conventions dédiées aux jeux vidéo, mangas, comics et culture geek',
      color: '#3B82F6',
    },
  });

  const autoCategory = await prisma.category.upsert({
    where: { slug: 'automobile' },
    update: {},
    create: {
      name: 'Automobile',
      slug: 'automobile',
      description: 'Salons de l\'automobile et événements liés à l\'automobile',
      color: '#EF4444',
    },
  });

  const mangaCategory = await prisma.category.upsert({
    where: { slug: 'manga-anime' },
    update: {},
    create: {
      name: 'Manga / Anime',
      slug: 'manga-anime',
      description: 'Conventions dédiées au manga et à l\'anime',
      color: '#8B5CF6',
    },
  });

  // Créer des conventions
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  // PGW
  await prisma.convention.upsert({
    where: { slug: 'paris-games-week' },
    update: {},
    create: {
      name: 'Paris Games Week',
      slug: 'paris-games-week',
      description: 'Le plus grand événement gaming de France',
      city: 'Paris',
      region: 'Île-de-France',
      address: 'Parc des Expositions de Paris',
      postalCode: '75015',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 9, 30), // Octobre
      endDate: new Date(nextYear.getFullYear(), 10, 3),
      website: 'https://www.parisgamesweek.com',
      ticketUrl: 'https://www.parisgamesweek.com/billetterie',
      price: 'À partir de 20€',
      isPopular: true,
      isVerified: true,
      categoryId: geekCategory.id,
    },
  });

  // Japan Expo
  await prisma.convention.upsert({
    where: { slug: 'japan-expo' },
    update: {},
    create: {
      name: 'Japan Expo',
      slug: 'japan-expo',
      description: 'Le plus grand festival de culture japonaise en Europe',
      city: 'Paris',
      region: 'Île-de-France',
      address: 'Parc des Expositions de Paris-Nord Villepinte',
      postalCode: '93420',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 6, 5), // Juillet
      endDate: new Date(nextYear.getFullYear(), 6, 8),
      website: 'https://www.japan-expo-paris.com',
      ticketUrl: 'https://www.japan-expo-paris.com/fr/billetterie',
      price: 'À partir de 25€',
      isPopular: true,
      isVerified: true,
      categoryId: mangaCategory.id,
    },
  });

  // Paris Manga
  await prisma.convention.upsert({
    where: { slug: 'paris-manga' },
    update: {},
    create: {
      name: 'Paris Manga',
      slug: 'paris-manga',
      description: 'Convention manga et anime à Paris',
      city: 'Paris',
      region: 'Île-de-France',
      address: 'Grande Halle de La Villette',
      postalCode: '75019',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 2, 15), // Mars
      endDate: new Date(nextYear.getFullYear(), 2, 17),
      website: 'https://www.parismanga.fr',
      price: 'À partir de 15€',
      isPopular: true,
      isVerified: true,
      categoryId: mangaCategory.id,
    },
  });

  // Japan Wave Douai
  await prisma.convention.upsert({
    where: { slug: 'japan-wave-douai' },
    update: {},
    create: {
      name: 'Japan Wave',
      slug: 'japan-wave-douai',
      description: 'Festival de culture japonaise à Douai',
      city: 'Douai',
      region: 'Hauts-de-France',
      address: 'Gayant Expo',
      postalCode: '59500',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 4, 10), // Mai
      endDate: new Date(nextYear.getFullYear(), 4, 12),
      website: 'https://www.japan-wave.fr',
      price: 'À partir de 12€',
      isPopular: false,
      isVerified: false,
      categoryId: mangaCategory.id,
    },
  });

  // Salon de l'Auto
  await prisma.convention.upsert({
    where: { slug: 'salon-auto-paris' },
    update: {},
    create: {
      name: 'Salon de l\'Automobile de Paris',
      slug: 'salon-auto-paris',
      description: 'Le Mondial de l\'Automobile, le plus grand salon auto de France',
      city: 'Paris',
      region: 'Île-de-France',
      address: 'Parc des Expositions de Paris',
      postalCode: '75015',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 9, 15), // Octobre
      endDate: new Date(nextYear.getFullYear(), 9, 27),
      website: 'https://www.mondial-automobile.com',
      ticketUrl: 'https://www.mondial-automobile.com/billetterie',
      price: 'À partir de 18€',
      isPopular: true,
      isVerified: true,
      categoryId: autoCategory.id,
    },
  });

  // Événement manga à Orchies
  await prisma.convention.upsert({
    where: { slug: 'manga-orchies' },
    update: {},
    create: {
      name: 'Festival Manga Orchies',
      slug: 'manga-orchies',
      description: 'Petit événement manga dans la ville d\'Orchies',
      city: 'Orchies',
      region: 'Hauts-de-France',
      postalCode: '59310',
      country: 'France',
      startDate: new Date(nextYear.getFullYear(), 5, 20), // Juin
      endDate: new Date(nextYear.getFullYear(), 5, 21),
      price: 'Gratuit',
      isPopular: false,
      isVerified: false,
      categoryId: mangaCategory.id,
    },
  });

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

