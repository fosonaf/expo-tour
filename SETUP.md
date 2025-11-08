# Guide de démarrage rapide 🚀

## Installation rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer PostgreSQL

Assurez-vous que PostgreSQL est installé et démarré. Puis créez la base de données :
```bash
createdb expo_tour
```

Ou via psql :
```sql
CREATE DATABASE expo_tour;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/expo_tour?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Remplacez `USER` et `PASSWORD` par vos identifiants PostgreSQL.

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables dans la base de données
npm run db:push

# Remplir avec des données de démo
npm run db:seed
```

### 5. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure de la base de données

### Catégories
Les catégories créées par défaut :
- Jeux Vidéo / Geek
- Automobile
- Manga / Anime

### Conventions de démo
- Paris Games Week (Jeux Vidéo / Geek)
- Japan Expo (Manga / Anime)
- Paris Manga (Manga / Anime)
- Japan Wave Douai (Manga / Anime)
- Salon de l'Auto (Automobile)
- Festival Manga Orchies (Manga / Anime)

## Prochaines étapes

1. **Ajouter vos propres conventions** via l'API ou directement en base
2. **Personnaliser les catégories** selon vos besoins
3. **Améliorer l'UI** avec vos propres designs
4. **Préparer le Lot 2** : Authentification et alertes

## Commandes utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Base de données
npm run db:studio    # Interface graphique pour la DB
npm run db:migrate   # Créer une migration
npm run db:seed      # Réinitialiser avec des données de démo
```

## Troubleshooting

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est démarré
- Vérifiez que la base de données `expo_tour` existe
- Vérifiez les identifiants dans `.env`

### Erreur Prisma
```bash
npm run db:generate
```

### Port 3000 déjà utilisé
Changez le port dans `package.json` :
```json
"dev": "next dev -p 3001"
```

