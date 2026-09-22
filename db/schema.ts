// This is a sample database schema definition
// In a real application, you would use an ORM like Prisma or TypeORM

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedRestaurant {
  id: string;
  userId: string;
  restaurantId: string;
  savedAt: Date;
  notes?: string;
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  locationType: 'near-me' | 'destination';
  destination?: string;
  resultsCount: number;
  searchedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  preferredDistance: number; // in km
  preferredPriceLevel: number; // 1-4
  preferredCuisines: string[];
  preferredDietary: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distanceKm?: number; // calculated based on user location
  cuisine: string[];
  dietary: string[];
  priceLevel: number; // 1-4
  address: string;
  phone?: string;
  website?: string;
  openingHours?: {
    [day: string]: string;
  };
  isOpen?: boolean;
  photos: string[];
  services: string[]; // dine-in, takeaway, delivery, etc.
}

// API Response Types
export interface SearchResponse {
  query: {
    original: string;
    parsed: {
      cuisine: string[];
      dietary: string[];
      ratingMin?: number;
      reviewsMin?: number;
      distanceMaxKm?: number;
      priceMax?: number;
      locationType: 'near-me' | 'destination';
      destination?: string;
    };
  };
  results: Restaurant[];
  total: number;
  relaxationSuggestions?: Array<{
    suggestion: string;
    field: string;
    value: number | string;
  }>;
}

export interface RestaurantDetailsResponse extends Restaurant {
  matchExplanation: {
    ratingMatch: boolean;
    reviewsMatch: boolean;
    distanceMatch: boolean;
    cuisineMatch: boolean;
    dietaryMatch: boolean;
    priceMatch: boolean;
  };
}