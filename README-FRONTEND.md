# Frontend - Expo Tour

Documentation du frontend de l'application Expo Tour.

## Structure

### Pages

- `/` - Page d'accueil avec conventions populaires et catégories
- `/search` - Page de recherche avec filtres avancés
- `/categories/[slug]` - Page de catégorie
- `/conventions/[slug]` - Page de détail d'une convention

### Composants

#### ConventionFilters
Composant de filtres pour rechercher des conventions.

**Props :**
- `onFiltersChange: (filters: FilterParams) => void` - Callback appelé quand les filtres changent
- `categories?: Category[]` - Liste des catégories pour le select

**Filtres disponibles :**
- Recherche textuelle
- Ville, région, pays
- Catégorie
- Dates (à partir de, avant, entre deux dates)
- Filtres rapides (À venir, Populaires, Vérifiées)
- Tri (par date, nom, ville, etc.)

#### ConventionList
Affiche une liste de conventions sous forme de cartes.

**Props :**
- `conventions: Convention[]` - Liste des conventions à afficher
- `isLoading?: boolean` - État de chargement

#### Pagination
Composant de pagination.

**Props :**
- `currentPage: number` - Page actuelle
- `totalPages: number` - Nombre total de pages
- `onPageChange: (page: number) => void` - Callback appelé quand la page change

## Utilisation de l'API

### Récupérer les conventions

```typescript
const response = await fetch('/api/conventions?city=Paris&upcoming=true');
const data: ConventionResponse = await response.json();
```

### Filtres disponibles

Voir la documentation de l'API dans `postman/README.md` pour tous les paramètres disponibles.

### Exemple complet

```typescript
// Dans un composant React
const [conventions, setConventions] = useState<Convention[]>([]);
const [filters, setFilters] = useState<FilterParams>({
  city: 'Paris',
  upcoming: true,
  page: 1,
  limit: 12,
});

useEffect(() => {
  const fetchConventions = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    const response = await fetch(`/api/conventions?${params.toString()}`);
    const data: ConventionResponse = await response.json();
    setConventions(data.data);
  };
  
  fetchConventions();
}, [filters]);
```

## Types TypeScript

Tous les types sont définis dans `types/convention.ts` :

```typescript
interface Convention {
  id: string;
  name: string;
  slug: string;
  // ...
}

interface ConventionResponse {
  data: Convention[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## Styling

L'application utilise **Tailwind CSS** pour le styling. Les classes sont appliquées directement dans les composants.

### Thème

- Couleur principale : Bleu (`bg-blue-600`, `text-blue-600`)
- Couleur de succès : Vert (`text-green-500`)
- Background : Gris clair (`bg-gray-50`, `bg-gray-100`)

## Responsive Design

Tous les composants sont responsive :
- Mobile : 1 colonne
- Tablette : 2 colonnes
- Desktop : 3 colonnes

Utilisation de `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` dans Tailwind.

## Améliorations possibles

- [ ] Ajouter un mode sombre
- [ ] Implémenter la recherche en temps réel (debounce)
- [ ] Ajouter des animations de transition
- [ ] Améliorer l'accessibilité (ARIA labels, keyboard navigation)
- [ ] Ajouter des tests unitaires (Jest, React Testing Library)
- [ ] Implémenter le cache avec React Query ou SWR
- [ ] Ajouter un système de favoris
- [ ] Implémenter la géolocalisation pour trouver les conventions proches


