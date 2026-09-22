"use client"
import { useState } from 'react';

export default function TravelPage() {
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState<'driving' | 'walking' | 'transit'>('driving');
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetDirections = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call to get directions
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock route data
      setRoute({
        destination,
        mode: travelMode,
        distance: "12.4 km",
        duration: "25 mins",
        steps: [
          "Head north on Main St toward 1st Ave",
          "Turn right onto Broadway",
          "Continue onto Highway 101",
          "Take exit 42 toward Destination City",
          "Merge onto Destination Blvd",
          "Arrive at destination"
        ]
      });
    } catch (err) {
      setError('Failed to get directions. Please try again.');
      console.error('Directions error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Travel Mode</h1>
          <p className="mt-2 text-center text-gray-600">
            Get directions to your selected restaurant
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleGetDirections();
        }} className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium mb-2">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter restaurant address or name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Travel Mode
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="travelMode"
                  value="driving"
                  checked={travelMode === 'driving'}
                  onChange={() => setTravelMode('driving')}
                  className="h-4 w-4 text-blue-600"
                />
                <span>Driving</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="travelMode"
                  value="walking"
                  checked={travelMode === 'walking'}
                  onChange={() => setTravelMode('walking')}
                  className="h-4 w-4 text-blue-600"
                />
                <span>Walking</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="travelMode"
                  value="transit"
                  checked={travelMode === 'transit'}
                  onChange={() => setTravelMode('transit')}
                  className="h-4 w-4 text-blue-600"
                />
                <span>Transit</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!destination.trim()}
          >
            {loading ? 'Getting Directions...' : 'Get Directions'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded mt-6">
            {error}
          </div>
        )}

        {route && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Route to {route.destination}</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{route.distance}</p>
                  <p className="text-sm text-gray-500">Distance</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{route.duration}</p>
                  <p className="text-sm text-gray-500">Estimated time</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Directions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  {route.steps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 text-gray-400">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}