"use client"
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock restaurant details data for development
const mockRestaurantDetails = {
  "1": {
    id: "1",
    name: "Spice Garden",
    rating: 4.8,
    review_count: 1240,
    distance_km: 2.3,
    cuisine: ["Indian", "Thai"],
    dietary: ["Vegetarian", "Vegan Options", "Gluten-Free Options"],
    price_level: 3,
    address: "123 Food Street, New York",
    phone: "(555) 123-4567",
    website: "https://spicegarden.example.com",
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "12:00 PM - 11:00 PM",
      sunday: "12:00 PM - 10:00 PM"
    },
    match_score: 95,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: true,
      cuisine_match: true,
      dietary_match: true,
      price_match: true
    },
    photos: [
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyOXwwfDF8c2VhcmNofDF8fHJlc3RhdXJhbnQlfGVufDB8fHx8MTYyNzg0NDU2Nw&ixlib=rb-1.2.1&q=80&w=400",
      "https://images.unsplash.com/photo-1588173930-417fb5dd4f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyOXwwfDF8c2VhcmNofDF8fHJlc3RhdXJhbnQlfGVufDB8fHx8MTYyNzg0NDU2Nw&ixlib=rb-1.2.1&q=80&w=400"
    ]
  },
  "2": {
    id: "2",
    name: "Green Leaf Cafe",
    rating: 4.6,
    review_count: 890,
    distance_km: 1.7,
    cuisine: ["Salads", "Healthy"],
    dietary: ["Vegan", "Gluten-Free", "Paleo Options"],
    price_level: 2,
    address: "456 Healthy Ave, New York",
    phone: "(555) 987-6543",
    website: "https://greenleafcafe.example.com",
    hours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 9:00 PM",
      saturday: "9:00 AM - 9:00 PM",
      sunday: "9:00 AM - 8:00 PM"
    },
    match_score: 92,
    match_explanation: {
      rating_match: true,
      reviews_match: true,
      distance_match: true,
      cuisine_match: true,
      dietary_match: true,
      price_match: true
    },
    photos: [
      "https://images.unsplash.com/photo-1546069901-3bce53d994ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyOXwwfDF8c2VhcmNofDF8fHNhbGFkc3xfGVufDB8fHx8MTYyNzg0NDU2Nw&ixlib=rb-1.2.1&q=80&w=400",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyOXwwfDF8c2VhcmNofDF8fBoYWx0aHlfGVufDB8fHx8MTYyNzg0NDU2Nw&ixlib=rb-1.2.1&q=80&w=400"
    ]
  }
};

export default function RestaurantDetailsPage({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const restaurantData = mockRestaurantDetails[params.id as keyof typeof mockRestaurantDetails];

        if (!restaurantData) {
          setError('Restaurant not found');
          notFound();
          return;
        }

        setRestaurant(restaurantData);
      } catch (err) {
        setError('Failed to load restaurant details');
        console.error('Restaurant details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading restaurant details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-4">Restaurant Not Found</h2>
            <p className="text-gray-600">
              We couldn't find the restaurant you're looking for.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Search
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Restaurant Images */}
          <div className="space-y-4">
            {restaurant.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${restaurant.name} ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            ))}
          </div>

          {/* Restaurant Info */}
          <div className="p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center space-x-3 mt-2 text-sm">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  ⭐ {restaurant.rating}
                </span>
                <span className="ml-2 text-gray-500">({restaurant.review_count} reviews)</span>
                <span className="ml-2 text-gray-500">📍 {restaurant.distance_km} km away</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Cuisine</h3>
                <p className="text-gray-600">{restaurant.cuisine.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dietary</h3>
                <p className="text-gray-600">{restaurant.dietary.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price Level</h3>
                <p className="text-gray-600">
                  {/* Assuming price_level 1-4 maps to symbols */}
                  {['₹', '₹₹', '₹₹₹', '₹₹₹₹'][restaurant.price_level - 1] || '₹'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Hours of Operation</h3>
              <div className="space-y-2">
                {[Object.keys(restaurant.hours)].map((day) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="font-medium">{day}</span>
                    <span className="text-gray-600">{restaurant.hours[day as keyof typeof restaurant.hours]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-3">Why This Restaurant Matches Your Search</h3>
              <p className="text-sm text-gray-600 mb-2">
                Based on your preferences, this restaurant scored {restaurant.match_score}% match.
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

            <div className="flex space-x-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Save
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.363l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Directions
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.008 10.508L16.492 18l5.316-5.316a4 4 0 00-5.656-5.656l-1.294 1.294A3.998 3.998 0 007 12.506v-.008zM12 10a2 2 0 1000-4 2 2 0 000 4z" />
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
    </div>
  );
}