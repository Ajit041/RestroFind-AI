"use client"
import { useState } from 'react';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    rating: number;
    review_count: number;
    distance_km: number;
    cuisine: string[];
    dietary: string[];
    price_level: number; // 1-4
    address: string;
    match_score: number;
    match_explanation: {
      rating_match: boolean;
      reviews_match: boolean;
      distance_match: boolean;
      cuisine_match: boolean;
      dietary_match: boolean;
      price_match: boolean;
    };
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const priceSymbols = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];
  const priceSymbol = priceSymbols[restaurant.price_level - 1] || '₹';

  const getCuisineBadges = () => {
    const badges = [
      ...(restaurant.dietary || []).map(diet => ({
        text: diet.charAt(0).toUpperCase() + diet.slice(1),
        color: 'bg-green-100 text-green-800'
      })),
      ...(restaurant.cuisine || []).slice(0, 2).map(cuisine => ({
        text: cuisine,
        color: 'bg-blue-100 text-blue-800'
      }))
    ];
    return badges;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                ⭐ {restaurant.rating}
              </span>
              <span className="ml-2 text-gray-500">({restaurant.review_count} reviews)</span>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📍 {restaurant.distance_km} km away</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {getCuisineBadges().map((badge, index) => (
                <span key={index} className={`${badge.color} text-xs px-2 py-1 rounded`}>
                  {badge.text}
                </span>
              ))}
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {priceSymbol}
              </span>
            </div>
          }

          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <svg className="mt-1 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.758 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.758 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.758 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.758 0h3.012c.53 0 .921.395.921.882v.118a6.962 6.962 0 01-.096 4.592A6.962 6.962 0 0118.245 18a6.962 6.962 0 01-3.806 2.118.553.553 0 01-.446.06H6.57a.553.553 0 01-.446-.06A6.962 6.962 0 016.46 13.401a6.962 6.962 0 01-.096-4.592v-.118a6.962 6.962 0 00-.921-.882z" />
              </svg>
              <div>
                <p className="font-medium">{restaurant.match_score}% Match</p>
                <p className="text-sm text-gray-600">
                  Why it matches your search:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {restaurant.match_explanation.rating_match && (
                    <li key="rating">✓ Rating above your minimum requirement</li>
                  )}
                  {restaurant.match_explanation.reviews_match && (
                    <li key="reviews">✓ More than your minimum review requirement</li>
                  )}
                  {restaurant.match_explanation.distance_match && (
                    <li key="distance">✓ Within your maximum distance</li>
                  )}
                  {restaurant.match_explanation.cuisine_match && (
                    <li key="cuisine">✓ Matches your preferred cuisine</li>
                  )}
                  {restaurant.match_explanation.dietary_match && (
                    <li key="dietary">✓ Matches your dietary preference</li>
                  )}
                  {restaurant.match_explanation.price_match && (
                    <li key="price">✓ Within your budget</li>
                  )}
                </ul>
              </div>
            </div>
          }

          <div className="flex space-x-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors ${isSaved ? 'bg-red-100 text-red-800' : ''}`}
            >
              {isSaved ? 'Saved' : 'Save'}
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.363l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Directions
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.008 10.508L16.492 18l5.316-5.316a4 4 0 00-5.656-5.656l-1.294 1.294A3.998 3.998 0 007 12.506v-.008zM12 10a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
            <button
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Visit Website
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a1 1 0 01.42 1.42l-5.096 2.883a1 1 0 00-.42 1.42l5.096-2.883z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}