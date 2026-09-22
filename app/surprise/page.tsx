"use client"
import { useEffect, useState } from 'react';

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
  },
  {
    id: "4",
    name: "Bella Italia",
    rating: 4.7,
    review_count: 2100,
    distance_km: 4.1,
    cuisine: ["Italian", "Pizza"],
    dietary: ["Vegetarian Options"],
    price_level: 3,
    address: "321 Bella Vista, New York",
    match_score: 88,
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
    id: "5",
    name: "Zen Garden",
    rating: 4.5,
    review_count: 950,
    distance_km: 1.9,
    cuisine: ["Japanese", "Sushi"],
    dietary: ["Gluten-Free Options"],
    price_level: 4,
    address: "654 Zen Way, New York",
    match_score: 91,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: true,
      cuisine_match: true,
      dietary_match: true,
      price_match: true
    }
  }
];

export default function SurprisePage() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * mockRestaurants.length);
    return mockRestaurants[randomIndex];
  };

  const handleSurpriseMe = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));

      const randomRestaurant = getRandomRestaurant();
      setRestaurant(randomRestaurant);
    } catch (err) {
      setError('Failed to get surprise restaurant. Please try again.');
      console.error('Surprise error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Surprise Me!</h1>
          <p className="mt-2 text-center text-gray-600">
            Feeling adventurous? Let us pick a restaurant for you.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Finding a surprise restaurant...</p>
          </div>
        ) : (
          <>
            {!restaurant && (
              <div className="text-center py-12">
                <p className="text-gray-500">Click the button below to get a surprise restaurant recommendation</p>
              </div>
            )}

            {restaurant && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-center">Your Surprise Restaurant</h2>
                  <p className="text-center text-gray-600">
                    We think you'll love this place!
                  </p>
                </div>

                <div className="space-y-4">
                  <RestaurantCard restaurant={restaurant} />
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleSurpriseMe}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Get Another Surprise
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!restaurant && !loading && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSurpriseMe}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
            >
              Surprise Me!
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}