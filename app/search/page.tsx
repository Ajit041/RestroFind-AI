"use client"
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import { useState } from 'react';

// Mock restaurant data for development
const mockRestaurants = [
  {
    id: "1",
    name: "Spice Garden",
    rating: 4.8,
    review_count: 1240,
    distance_km: 2.3,
    cuisine: ["Indian", "Thai"],
    dietary: ["Vegetarian", "Vegan Options"],
    price_level: 3,
    address: "123 Food Street, New York",
    match_score: 95,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: true,
      cuisine_match: true,
      dietary_match: true,
      price_match: true
    }
  },
  {
    id: "2",
    name: "Green Leaf Cafe",
    rating: 4.6,
    review_count: 890,
    distance_km: 1.7,
    cuisine: ["Salads", "Healthy"],
    dietary: ["Vegan", "Gluten-Free"],
    price_level: 2,
    address: "456 Healthy Ave, New York",
    match_score: 92,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: true,
      cuisine_match: true,
      dietary_match: true,
      price_match: true
    }
  },
  {
    id: "3",
    name: "Sea Salt Grill",
    rating: 4.4,
    review_count: 560,
    distance_km: 3.2,
    cuisine: ["Seafood", "Mediterranean"],
    dietary: ["Gluten-Free Options"],
    price_level: 4,
    address: "789 Ocean Blvd, New York",
    match_score: 78,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: false,
      cuisine_match: true,
      dietary_match: false,
      price_match: true
    }
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [locationType, setLocationType] = useState<'near-me' | 'destination'>('near-me');
  const [destination, setDestination] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string, locationType: 'near-me' | 'destination', destination?: string) => {
    setLoading(true);
    setError(null);
    setQuery(query);
    setLocationType(locationType);
    if (locationType === 'destination') {
      setDestination(destination || '');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter mock data based on query (simple implementation)
      const filteredRestaurants = mockRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.some(cuisine => cuisine.toLowerCase().includes(query.toLowerCase())) ||
        restaurant.dietary.some(diet => diet.toLowerCase().includes(query.toLowerCase()))
      );

      setRestaurants(filteredRestaurants.length > 0 ? filteredRestaurants : mockRestaurants);
    } catch (err) {
      setError('Failed to search restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">RestroFind AI</h1>
          <p className="mt-2 text-center text-gray-600">
            Tell us what you want to eat. We'll find the best places for you.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Searching for restaurants...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {!query && locationType === 'near-me' && (
              <div className="text-center py-12">
                <p className="text-gray-500">Search for restaurants to get started</p>
                <div className="mt-4 flex flex-col space-x-2 items-center">
                  <span className="text-sm">Try: "Best veg restaurant near me", "4.5+ rating", "1000+ reviews"</span>
                </div>
              </div>
            )}

            {restaurants.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Found {restaurants.length} restaurants
                </h2>
                <div className="space-y-4">
                  {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </>
            )}

            {restaurants.length === 0 && query && (
              <div className="text-center py-12">
                <p className="text-gray-500">No restaurants found matching your search</p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}