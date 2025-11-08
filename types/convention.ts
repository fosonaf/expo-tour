export interface Convention {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  city: string;
  region?: string | null;
  address?: string | null;
  postalCode?: string | null;
  country: string;
  startDate: string | Date;
  endDate: string | Date;
  website?: string | null;
  ticketUrl?: string | null;
  price?: string | null;
  isPopular: boolean;
  isVerified: boolean;
  imageUrl?: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ConventionResponse {
  data: Convention[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
}

