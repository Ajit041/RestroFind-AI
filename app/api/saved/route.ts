// app/api/saved/route.ts
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
    const mockSavedRestaurants = [
      {
        id: "saved_1",
        restaurantId: "rest_1",
        name: "Green Leaf Restaurant",
        rating: 4.7,
        review_count: 2843,
        distance_km: 1.8,
        cuisine: ["North Indian", "Punjabi", "Vegetarian"],
        dietary: ["vegetarian"],
        price_level: 2,
        savedAt: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        id: "saved_2",
        restaurantId: "rest_2",
        name: "Pure Veg Bistro",
        rating: 4.6,
        review_count: 1542,
        distance_km: 2.3,
        cuisine: ["South Indian", "Vegetarian"],
        dietary: ["vegetarian", "vegan"],
        price_level: 1,
        savedAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];

    return NextResponse.json(mockSavedRestaurants);
  } catch (error) {
    console.error('Error fetching saved restaurants:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { restaurantId } = body;

    // TODO: Get actual user ID from auth
    const userId = MOCK_USER_ID;

    // TODO: Save to database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Restaurant saved successfully'
    });
  } catch (error) {
    console.error('Error saving restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json(
        { error: 'Restaurant ID is required' },
        { status: 400 }
      );
    }

    // TODO: Get actual user ID from auth
    const userId = MOCK_USER_ID;

    // TODO: Remove from database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Restaurant removed from saved'
    });
  } catch (error) {
    console.error('Error removing saved restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}