import SearchBar from '@/components/SearchBar';

export default function Home() {
  const handleSearch = (query: string, locationType: 'near-me' | 'destination', destination?: string) => {
    console.log('Searching for:', { query, locationType, destination });
    // TODO: Implement actual search logic
    alert(`Searching for: ${query} in ${locationType === 'near-me' ? 'current location' : destination || 'unknown location'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
            RestroFind AI
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Tell us what you want to eat. We'll find the best places for you.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Tell us what you want</h3>
              <p className="text-gray-600">Simply describe what you're craving in natural language</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI finds matches</h3>
              <p className="text-gray-600">Our AI understands your requirements and searches millions of restaurants</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Get perfect results</h3>
              <p className="text-gray-600">See restaurants that match all your criteria with AI-powered explanations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Try it out</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RestroFind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}