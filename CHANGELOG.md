# Changelog - Expo Tour

## 🎉 Collection Postman et Frontend - Ajoutées

### Collection Postman
- ✅ Collection Postman complète avec tous les endpoints
- ✅ Requêtes pour tester les filtres de localisation
- ✅ Requêtes pour tester les filtres de dates
- ✅ Exemples de requêtes complexes
- ✅ Documentation complète dans `postman/README.md`

### Frontend - Composants React

#### Nouveaux composants
- ✅ `ConventionFilters` - Composant de filtres avec :
  - Recherche textuelle
  - Filtres par localisation (ville, région, pays)
  - Filtres par dates (à partir de, avant, entre deux dates)
  - Filtres rapides (À venir, Populaires, Vérifiées)
  - Filtres avancés (pliable/dépliable)
  - Tri personnalisable

- ✅ `ConventionList` - Affichage des conventions :
  - Cartes avec informations principales
  - Indicateur de convention vérifiée
  - Badge de catégorie
  - Dates formatées
  - État de chargement avec skeleton
  - Message quand aucune convention trouvée

- ✅ `Pagination` - Composant de pagination :
  - Navigation entre les pages
  - Affichage intelligent des pages
  - Boutons précédent/suivant
  - Indicateur de page actuelle

#### Nouvelles pages
- ✅ `/search` - Page de recherche complète avec :
  - Tous les filtres disponibles
  - Liste des conventions avec pagination
  - Chargement asynchrone des données
  - Gestion des états (loading, empty, error)

#### Types TypeScript
- ✅ `types/convention.ts` - Définitions de types :
  - `Convention` - Type pour une convention
  - `ConventionResponse` - Type pour la réponse API avec pagination
  - `Category` - Type pour une catégorie
  - `FilterParams` - Type pour les paramètres de filtres

### Améliorations

#### Page d'accueil
- ✅ Ajout d'un bouton "Rechercher" dans le header
- ✅ Lien vers la page de recherche

#### API
- ✅ Réponse avec pagination structurée
- ✅ Support de tous les filtres via QueryBuilder
- ✅ Gestion d'erreurs améliorée

### Documentation
- ✅ `postman/README.md` - Documentation de la collection Postman
- ✅ `README-FRONTEND.md` - Documentation du frontend
- ✅ Exemples d'utilisation dans les composants

## 🚀 Prochaines étapes

- [ ] Ajouter des tests unitaires pour les composants
- [ ] Implémenter la recherche en temps réel (debounce)
- [ ] Ajouter un système de favoris
- [ ] Implémenter la géolocalisation
- [ ] Ajouter un mode sombre
- [ ] Améliorer l'accessibilité
- [ ] Ajouter des animations de transition

## 📝 Notes

### Utilisation de la collection Postman
1. Importer `postman/Expo-Tour.postman_collection.json` dans Postman
2. Configurer la variable `base_url` (défaut: `http://localhost:3000`)
3. Tester les différents endpoints

### Utilisation du frontend
1. Lancer l'application : `npm run dev`
2. Accéder à `/search` pour la recherche avancée
3. Utiliser les filtres pour trouver des conventions
4. Naviguer entre les pages avec la pagination

### Filtres disponibles via l'API
- Localisation : `city`, `region`, `country`, `postalCode`
- Dates : `startDateAfter`, `startDateBefore`, `dateBetweenStart`, `dateBetweenEnd`
- Statut : `upcoming`, `past`, `popular`, `verified`
- Recherche : `search`, `categoryId`, `categorySlug`
- Pagination : `page`, `limit`, `sortBy`, `sortOrder`


