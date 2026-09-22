// app/api/search-history/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In a real app, you would get the user ID from the auth context or session
// For this example, we'll use a mock user ID
const MOCK_USER_ID = '1';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get actual user ID from auth
    const userId = MOCK_USER_ID;

    // TODO: Fetch from database
    // For now, return mock data
    const mockSearchHistory = [
      {
        id: "hist_1",
        query: "Best veg restaurant near me",
        locationType: "near-me",
        resultsCount: 12,
        searchedAt: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: "hist_2",
        query: "Seafood in Mumbai",
        locationType: "destination",
        destination: "Mumbai",
        resultsCount: 8,
        searchedAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];

    return NextResponse.json(mockSearchHistory);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, locationType, destination, resultsCount } = body;

    // TODO: Get actual user ID from auth
    const userId = MOCK_USER_ID;

    // TODO: Save to database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Search added to history'
    });
  } catch (error) {
    console.error('Error adding to search history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const historyId = searchParams.get('id');

    if (!historyId) {
      return NextResponse.json(
        { error: 'History ID is required' },
        { status: 400 }
      );
    }

    // TODO: Remove from database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'History item removed'
    });
  } catch (error) {
    console.error('Error removing from search history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}