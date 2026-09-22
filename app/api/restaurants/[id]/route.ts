import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Fetch restaurant details from database or API
    // For now, return mock data

    return NextResponse.json({
      id,
      name: "Sample Restaurant",
      rating: 4.5,
      review_count: 1200,
      distance_km: 2.3,
      cuisine: ["Indian", "Vegetarian", "North Indian"],
      dietary: ["vegetarian"],
      price_level: 2,
      price_range: "₹₹",
      address: "123 Sample Street, City, State 12345",
      phone: "+1 (555) 123-4567",
      website: "https://example.com",
      opening_hours: {
        monday: "11:00 AM - 10:00 PM",
        tuesday: "11:00 AM - 10:00 PM",
        wednesday: "11:00 AM - 10:00 PM",
        thursday: "11:00 AM - 10:00 PM",
        friday: "11:00 AM - 11:00 PM",
        saturday: "10:00 AM - 11:00 PM",
        sunday: "10:00 AM - 10:00 PM"
      },
      is_open: true,
      photos: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg"
      ],
      services: ["dine-in", "takeaway", "delivery"],
      review_summary: {
        food_quality: "Excellent",
        service: "Great",
        ambience: "Nice",
        cleanliness: "Clean",
        value: "Good"
      },
      match_explanation: {
        rating_match: true,
        reviews_match: true,
        distance_match: true,
        cuisine_match: true,
        dietary_match: true,
        price_match: true
      }
    });
  } catch (error) {
    console.error('Restaurant details error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}