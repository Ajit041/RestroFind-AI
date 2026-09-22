"use client"
import { useEffect, useState } from 'react';

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const { data, error } = await supabase.from('search_history').select('*').order('searched_at', { ascending: false });

        if (error) throw error;
        setLoading(false);
        setSearchHistory(data || []); // Use real data from Supabase
      } catch (error) {
        setLoading(false);
        console.error('Error fetching search history:', error);
        // Optionally, keep mock data as fallback during development
        // setSearchHistory([ /* mock data */ ]);
      }
    };

    fetchSearchHistory();
  }, []); // Important: Keep empty deps array to run once on mount

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      {searchHistory.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Search History</h2>
          <div className="space-y-4">
            {searchHistory.map(item => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.query}</h3>
                  <span className="text-xs text-gray-500">
                    {item.timestamp.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.locationType === 'near-me' ? '📍 Near Me' : '📍 Destination'}
                  </span>
                  {item.locationType === 'destination' && (
                    <span className="ml-2 text-gray-600">{item.destination}</span>
                  )}
                  <span className="ml-4 text-gray-500">{item.resultsCount} results found</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No search history yet</p>
        </div>
      )}
    </div>
  );
}