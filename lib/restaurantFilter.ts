// Restaurant filtering service
// Takes parsed query and restaurant data, returns filtered results

import type { Restaurant, ParsedQuery } from '@/db/schema';

/**
 * Filters restaurants based on parsed query parameters
 */
export function filterRestaurants(
  restaurants: Restaurant[],
  query: ParsedQuery
): Restaurant[] {
  return restaurants.filter(restaurant => {
    // Cuisine filter
    if (query.cuisine.length > 0) {
      const hasMatchingCuisine = query.cuisine.some(cuisine =>
        restaurant.cuisine.some(item =>
          item.toLowerCase().includes(cuisine.toLowerCase())
        )
      );
      if (!hasMatchingCuisine) return false;
    }

    // Dietary filter
    if (query.dietary.length > 0) {
      const hasMatchingDietary = query.dietary.some(diet =>
        restaurant.dietary.some(item =>
          item.toLowerCase().includes(diet.toLowerCase())
        )
      );
      if (!hasMatchingDietary) return false;
    }

    // Rating filter
    if (query.ratingMin !== undefined && restaurant.rating < query.ratingMin) {
      return false;
    }

    // Review count filter
    if (query.reviewsMin !== undefined && restaurant.reviewCount < query.reviewsMin) {
      return false;
    }

    // Distance filter (if distance is available)
    if (query.distanceMaxKm !== undefined && restaurant.distanceKm !== undefined) {
      if (restaurant.distanceKm > query.distanceMaxKm) {
        return false;
      }
    }

    // Price filter
    if (query.priceMax !== undefined) {
      // Convert price level to approximate price range
      // This is simplified - in reality you'd have actual price data
      const approximatePrice = restaurant.priceLevel * 250; // Very rough estimate
      if (approximatePrice > query.priceMax) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Calculates a match score for each restaurant based on how well it matches the query
 */
export function calculateMatchScores(
  restaurants: Restaurant[],
  query: ParsedQuery
): Array<{ restaurant: Restaurant; matchScore: number; matchExplanation: any }> {
  return restaurants.map(restaurant => {
    let score = 0;
    const maxScore = 100;
    const explanation: any = {
      rating_match: false,
      reviews_match: false,
      distance_match: false,
      cuisine_match: false,
      dietary_match: false,
      price_match: false
    };

    // Cuisine match (20 points)
    if (query.cuisine.length === 0) {
      score += 20;
      explanation.cuisine_match = true;
    } else {
      const cuisineMatches = query.cuisine.filter(cuisine =>
        restaurant.cuisine.some(item =>
          item.toLowerCase().includes(cuisine.toLowerCase())
        )
      ).length;
      const cuisineScore = (cuisineMatches / query.cuisine.length) * 20;
      score += cuisineScore;
      explanation.cuisine_match = cuisineMatches > 0;
    }

    // Dietary match (20 points)
    if (query.dietary.length === 0) {
      score += 20;
      explanation.dietary_match = true;
    } else {
      const dietaryMatches = query.dietary.filter(diet =>
        restaurant.dietary.some(item =>
          item.toLowerCase().includes(diet.toLowerCase())
        )
      ).length;
      const dietaryScore = (dietaryMatches / query.dietary.length) * 20;
      score += dietaryScore;
      explanation.dietary_match = dietaryMatches > 0;
    }

    // Rating match (15 points)
    if (query.ratingMin === undefined) {
      score += 15;
      explanation.rating_match = true;
    } else {
      if (restaurant.rating >= query.ratingMin) {
        // Bonus for higher ratings
        const ratingExcess = Math.min(restaurant.rating - query.ratingMin, 2); // Max 2 points bonus
        score += 15 + ratingExcess;
        explanation.rating_match = true;
      }
    }

    // Review count match (15 points)
    if (query.reviewsMin === undefined) {
      score += 15;
      explanation.reviews_match = true;
    } else {
      if (restaurant.reviewCount >= query.reviewsMin) {
        // Bonus for higher review counts (up to a point)
        const reviewExcess = Math.min(
          (restaurant.reviewCount - query.reviewsMin) / 1000,
          5
        ); // Max 5 points bonus
        score += 15 + reviewExcess;
        explanation.reviews_match = true;
      }
    }

    // Distance match (15 points)
    if (query.distanceMaxKm === undefined) {
      score += 15;
      explanation.distance_match = true;
    } else if (restaurant.distanceKm !== undefined) {
      if (restaurant.distanceKm <= query.distanceMaxKm) {
        // Bonus for closer distances
        const distanceRatio = 1 - (restaurant.distanceKm / query.distanceMaxKm);
        const distanceBonus = distanceRatio * 10; // Up to 10 points bonus
        score += 15 + distanceBonus;
        explanation.distance_match = true;
      }
    }

    // Price match (15 points)
    if (query.priceMax === undefined) {
      score += 15;
      explanation.price_match = true;
    } else {
      // Convert price level to approximate price range
      const approximatePrice = restaurant.priceLevel * 250; // Very rough estimate
      if (approximatePrice <= query.priceMax) {
        // Bonus for lower prices
        const priceSavings = Math.max(0, query.priceMax - approximatePrice);
        const priceBonus = Math.min(priceSavings / 50, 10); // Up to 10 points bonus
        score += 15 + priceBonus;
        explanation.price_match = true;
      }
    }

    // Ensure score doesn't exceed max
    score = Math.min(score, maxScore);

    return {
      restaurant,
      matchScore: Math.round(score),
      matchExplanation: explanation
    };
  });
}

/**
 * Sorts restaurants based on the specified sort criteria
 */
export function sortRestaurants(
  scoredRestaurants: Array<{ restaurant: Restaurant; matchScore: number; matchExplanation: any }>,
  sortBy: string = 'best-match'
): Array<{ restaurant: Restaurant; matchScore: number; matchExplanation: any }> {
  return [...scoredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.restaurant.rating - a.restaurant.rating;
      case 'most-reviewed':
        return b.restaurant.reviewCount - a.restaurant.reviewCount;
      case 'nearest':
        // Handle undefined distances
        const distA = a.restaurant.distanceKm ?? Number.MAX_VALUE;
        const distB = b.restaurant.distanceKm ?? Number.MAX_VALUE;
        return distA - distB;
      case 'lowest-price':
        // Handle undefined price levels
        const priceA = a.restaurant.priceLevel ?? Number.MAX_VALUE;
        const priceB = b.restaurant.priceLevel ?? Number.MAX_VALUE;
        return priceA - priceB;
      case 'highest-match':
      case 'best-match':
      default:
        return b.matchScore - a.matchScore;
    }
  });
}