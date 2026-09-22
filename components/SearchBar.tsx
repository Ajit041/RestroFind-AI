"use client"
import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string, locationType: 'near-me' | 'destination', destination?: string) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');
  const [locationType, setLocationType] = useState<'near-me' | 'destination'>('near-me');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, locationType, locationType === 'destination' ? destination : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={locationType === 'near-me'}
            onChange={() => setLocationType('near-me')}
            className="h-4 w-4 text-blue-600"
          />
          <span>📍 Near Me</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={locationType === 'destination'}
            onChange={() => setLocationType('destination')}
            className="h-4 w-4 text-blue-600"
          />
          <span>
            📍 Where are you going?
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter city or area"
              className="ml-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={locationType !== 'destination'}
            />
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="search-query" className="block text-sm font-medium mb-1">
          What are you looking for?
        </label>
        <input
          type="text"
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: Best veg restaurant near me, 4.5+ rating, 1000+ reviews"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        disabled={!query.trim()}
      >
        {locationType === 'near-me' ? 'Find My Restaurant' : 'Find Restaurants'}
      </button>
    </form>
  );
}