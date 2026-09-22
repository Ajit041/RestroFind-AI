"use client"
import { useEffect, useState } from 'react';

export default function SavedRestaurants() {
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRestaurants = async () => {
      try {
        const { data, error } = await supabase.from('saved_restaurants').select('*');

        if (error) throw error;
        setLoading(false);
        setSavedRestaurants(data || []); // Use real data from Supabase
      } catch (error) {
        setLoading(false);
        console.error('Error fetching saved restaurants:', error);
        // Optionally, keep mock data as fallback during development
        // setSavedRestaurants([ /* mock data */ ]);
      }
    };

    fetchSavedRestaurants();
  }, []); // Important: Keep empty deps array to run once on mount

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      {savedRestaurants.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Saved Restaurants</h2>
          <div className="space-y-4">
            {savedRestaurants.map(restaurant => (
              <div key={restaurant.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="h-10 w-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <p className="text-gray-600">{restaurant.address}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                        ⭐ {restaurant.rating}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">({restaurant.review_count} reviews)</span>
                      <span className="ml-2 text-gray-500 text-sm">📍 {restaurant.distance_km}km away</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[...(restaurant.dietary || []).map(diet => ({
                        text: diet.charAt(0).toUpperCase() + diet.slice(1),
                        color: 'bg-green-100 text-green-800'
                      })), ...(restaurant.cuisine || []).slice(0, 2).map(cuisine => ({
                        text: cuisine,
                        color: 'bg-blue-100 text-blue-800'
                      }))].map((badge, index) => (
                        <span key={index} className={`${badge.color} text-xs px-2 py-1 rounded`}>
                          {badge.text}
                        </span>
                      ))}
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {/* Assuming price_level 1-4 maps to symbols */}
                        {['₹', '₹₹', '₹₹₹', '₹₹₹₹'][restaurant.price_level - 1] || '₹'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No saved restaurants yet</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go Find Some!
          </button>
        </div>
      )}
    </div>
  );
}