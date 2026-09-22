import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, location } = body;

    // TODO: Implement AI query parsing
    // TODO: Call places API
    // TODO: Filter and rank results
    // TODO: Return formatted response

    // For now, return mock data
    return NextResponse.json({
      query: {
        original: query,
        parsed: {
          cuisine: [],
          dietary: [],
          rating_min: null,
          reviews_min: null,
          distance_max_km: null,
          price_max: null
        }
      },
      results: [
        {
          id: "1",
          name: "Sample Restaurant",
          rating: 4.5,
          review_count: 1200,
          distance_km: 2.3,
          cuisine: ["Indian", "Vegetarian"],
          dietary: ["vegetarian"],
          price_level: 2,
          address: "123 Sample Street, City",
          is_open: true,
          photos: [],
          match_score: 95,
          match_explanation: {
            rating_match: true,
            reviews_match: true,
            distance_match: true,
            cuisine_match: true,
            dietary_match: true
          }
        }
      ],
      total: 1,
      relaxationSuggestions: []
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}