# Expo Tour 🎪

Application web pour répertorier et découvrir toutes les conventions et salons par catégorie.

## 🎯 Fonctionnalités

### Lot 1 (Actuel)
- ✅ Répertoire des conventions et salons par catégories
- ✅ Recherche et filtrage par catégorie, ville, dates
- ✅ Affichage des conventions populaires et locales
- ✅ Pages dédiées pour chaque convention et catégorie
- ✅ API REST pour la gestion des conventions et catégories

### Lot 2 (À venir)
- 🔲 Système d'authentification
- 🔲 Alertes personnalisées
- 🔲 Roadmap de conventions par utilisateur

### Lot 3 (À venir)
- 🔲 Suggestions de logements et transports
- 🔲 IA pour optimiser les tarifs selon les horaires

## 🛠️ Stack Technique

- **Frontend**: Next.js 14+ (App Router) avec TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🚀 Installation

1. **Cloner le projet** (si ce n'est pas déjà fait)
```bash
cd expo-tour
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**

Créez un fichier `.env` à la racine du projet :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/expo_tour?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Assurez-vous que PostgreSQL est démarré et que la base de données `expo_tour` existe :
```bash
createdb expo_tour
```

4. **Initialiser la base de données**
```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Ou utiliser les migrations
npm run db:migrate

# Remplir avec des données de démo
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
expo-tour/
├── app/                      # Pages Next.js (App Router)
│   ├── api/                  # API Routes
│   │   ├── conventions/      # Endpoints pour les conventions
│   │   └── categories/       # Endpoints pour les catégories
│   ├── categories/           # Pages de catégories
│   ├── conventions/          # Pages de conventions
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Page d'accueil
│   └── globals.css           # Styles globaux
├── lib/                      # Utilitaires
│   └── prisma.ts             # Client Prisma
├── prisma/                   # Configuration Prisma
│   ├── schema.prisma         # Schéma de base de données
│   └── seed.ts               # Script de seed
├── components/               # Composants React (à créer)
└── public/                   # Fichiers statiques
```

## 🗄️ Modèle de données

### Category
- `id`: Identifiant unique
- `name`: Nom de la catégorie
- `slug`: URL-friendly identifier
- `description`: Description de la catégorie
- `icon`: Icône (optionnel)
- `color`: Couleur (optionnel)

### Convention
- `id`: Identifiant unique
- `name`: Nom de la convention
- `slug`: URL-friendly identifier
- `description`: Description
- `city`: Ville
- `region`: Région
- `address`: Adresse complète
- `postalCode`: Code postal
- `country`: Pays (défaut: France)
- `startDate`: Date de début
- `endDate`: Date de fin
- `website`: Site web
- `ticketUrl`: Lien vers la billetterie
- `price`: Prix (chaîne de caractères)
- `isPopular`: Convention populaire
- `isVerified`: Convention vérifiée
- `imageUrl`: Image (optionnel)
- `categoryId`: Référence à la catégorie

## 🔌 API Endpoints

### Conventions

- `GET /api/conventions` - Liste des conventions
  - Query params: `categoryId`, `city`, `upcoming`, `popular`
- `POST /api/conventions` - Créer une convention

### Catégories

- `GET /api/categories` - Liste des catégories
  - Query params: `withConventions`
- `POST /api/categories` - Créer une catégorie

## 📝 Commandes utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start

# Linter
npm run lint

# Base de données
npm run db:generate    # Générer le client Prisma
npm run db:push        # Pousser le schéma vers la DB
npm run db:migrate     # Créer une migration
npm run db:studio      # Ouvrir Prisma Studio
npm run db:seed        # Remplir avec des données de démo
```

## 🎨 Fonctionnalités à venir

- [ ] Authentification (NextAuth.js ou Clerk)
- [ ] Système d'alertes par email
- [ ] Roadmap personnalisée
- [ ] Filtres avancés (date, distance, prix)
- [ ] Recherche par mots-clés
- [ ] Carte interactive
- [ ] Partage sur les réseaux sociaux
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)

## 📄 Licence

MIT

## 👤 Auteur

Développé avec ❤️ pour les amateurs de conventions et salons
