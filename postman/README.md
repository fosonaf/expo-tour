# Collection Postman - Expo Tour API

Cette collection Postman contient tous les endpoints de l'API Expo Tour pour tester facilement les fonctionnalités.

## Installation

1. Ouvrez Postman
2. Cliquez sur **Import** en haut à gauche
3. Sélectionnez le fichier `Expo-Tour.postman_collection.json`
4. La collection sera importée avec toutes les requêtes

## Configuration

### Variable d'environnement

La collection utilise une variable `base_url` qui est définie par défaut à `http://localhost:3000`.

Pour modifier l'URL :
1. Cliquez sur la collection "Expo Tour API"
2. Allez dans l'onglet **Variables**
3. Modifiez la valeur de `base_url` si nécessaire

## Requêtes disponibles

### Conventions

#### Get All Conventions
- **GET** `/api/conventions`
- Récupère toutes les conventions avec pagination

#### Filter by City
- **GET** `/api/conventions?city=Paris`
- Filtre les conventions par ville

#### Filter by Date Range
- **GET** `/api/conventions?dateBetweenStart=2024-06-01&dateBetweenEnd=2024-08-31`
- Filtre les conventions entre deux dates

#### Upcoming Conventions
- **GET** `/api/conventions?upcoming=true`
- Récupère uniquement les conventions à venir

#### Create Convention
- **POST** `/api/conventions`
- Crée une nouvelle convention
- **Body** : JSON avec les données de la convention

### Catégories

#### Get All Categories
- **GET** `/api/categories`
- Récupère toutes les catégories

## Exemples de requêtes

### Recherche complexe
```
GET /api/conventions?city=Paris&country=France&startDateAfter=2024-01-01&popular=true&page=1&limit=20
```

### Filtres de dates
```
GET /api/conventions?dateBetweenStart=2024-06-01&dateBetweenEnd=2024-08-31
```

### Pagination
```
GET /api/conventions?page=2&limit=10&sortBy=startDate&sortOrder=asc
```

## Paramètres de requête disponibles

### Filtres de localisation
- `city` : Ville (recherche partielle)
- `region` : Région (recherche partielle)
- `country` : Pays (recherche partielle)
- `postalCode` : Code postal (exact)

### Filtres de dates
- `startDateAfter` : Date de début après (format: YYYY-MM-DD)
- `startDateBefore` : Date de début avant (format: YYYY-MM-DD)
- `endDateAfter` : Date de fin après (format: YYYY-MM-DD)
- `endDateBefore` : Date de fin avant (format: YYYY-MM-DD)
- `dateBetweenStart` : Début de la période (format: YYYY-MM-DD)
- `dateBetweenEnd` : Fin de la période (format: YYYY-MM-DD)
- `upcoming` : `true` pour les conventions à venir
- `past` : `true` pour les conventions passées

### Autres filtres
- `categoryId` : ID de la catégorie
- `categorySlug` : Slug de la catégorie
- `popular` : `true` pour les conventions populaires
- `verified` : `true` pour les conventions vérifiées
- `search` : Recherche textuelle dans name et description

### Pagination et tri
- `page` : Numéro de page (défaut: 1)
- `limit` : Nombre de résultats par page (défaut: 50)
- `sortBy` : Champ de tri (`startDate`, `endDate`, `name`, `city`, `createdAt`)
- `sortOrder` : Ordre de tri (`asc` ou `desc`)

## Réponse API

### Succès
```json
{
  "data": [
    {
      "id": "...",
      "name": "...",
      "slug": "...",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

### Erreur
```json
{
  "error": "Error message",
  "details": "Additional details"
}
```

## Tests

Vous pouvez ajouter des tests automatiques dans Postman :

```javascript
// Test de statut HTTP
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test de structure de réponse
pm.test("Response has data and pagination", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData).to.have.property('pagination');
});
```

