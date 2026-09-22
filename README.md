# RestroFind AI

**Tell us what you want to eat. We'll find the best places for you.**

## Overview

RestroFind AI is an AI-powered restaurant discovery website that helps users quickly find the best restaurants based on their natural-language requirements.

Instead of manually searching through hundreds of restaurants, users simply tell the application what they want, and the AI understands their requirements and finds matching restaurants.

## Key Features

- **Natural Language Search**: Tell us what you want in plain English/Hindi
- **Two Search Modes**: 
  - Near Me (uses current location)
  - Destination Search (search any city/area)
- **AI Query Understanding**: Converts natural language into structured filters
- **Smart Ranking**: Ranks restaurants based on how well they match your requirements
- **Match Explanations**: Shows why each restaurant matches your search
- **Restaurant Cards**: Beautiful display with photos, ratings, and key info
- **Filters Panel**: Refine results with dietary preferences, cuisine type, price, etc.
- **Map View**: See restaurant locations on a map
- **Saved Restaurants**: Bookmark your favorite places
- **Search History**: Easily repeat previous searches
- **Travel Mode**: Plan meals for trips in advance
- **Surprise Me**: Let the AI recommend something new
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes (Node.js, TypeScript)
- **Database**: PostgreSQL (for user data)
- **Authentication**: Optional (Clerk/Auth.js/Supabase)
- **AI Service**: Natural language processing for query understanding
- **Places API**: Legitimate restaurant/places data provider (abstraction layer)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Add your API keys
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app - Next.js app router pages and layouts
/components - Reusable React components
/api - Next.js API routes
/lib - Utility functions and library code
/services - Business logic and API integration
/types - TypeScript type definitions
/hooks - Custom React hooks
/utils - Helper functions
/db - Database models and migrations
/public - Static assets
```

## Environment Variables

Create a `.env.local` file with:

```
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Places API (example - replace with your provider)
PLACES_API_KEY=your_api_key_here
PLACES_API_URL=https://api.example.com

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/restrofind_ai

# Auth (if using)
# AUTH_SECRET=your_secret
# AUTH_GOOGLE_ID=your_google_id
# AUTH_GOOGLE_SECRET=your_google_secret
```

## Development Phases

As outlined in the specifications, the project will be built in phases:

1. **Phase 1**: Create UI and landing page
2. **Phase 2**: Implement location search and current-location detection
3. **Phase 3**: Integrate restaurant/places API
4. **Phase 4**: Implement natural-language AI query parsing
5. **Phase 5**: Implement restaurant filtering
6. **Phase 6**: Implement intelligent ranking
7. **Phase 7**: Implement restaurant details
8. **Phase 8**: Implement map view
9. **Phase 9**: Implement authentication
10. **Phase 10**: Implement saved restaurants and search history
11. **Phase 11**: Implement travel/destination mode
12. **Phase 12**: Optimize performance, security, accessibility and mobile UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the need to simplify restaurant discovery
- Built with Next.js and modern web technologies
- Uses legitimate places/data providers (no scraping)