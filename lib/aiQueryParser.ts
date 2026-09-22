// Simple natural language query parser for restaurant search
// In a real application, this would be more sophisticated or use an LLM

export interface ParsedQuery {
  cuisine: string[];
  dietary: string[];
  ratingMin?: number;
  reviewsMin?: number;
  distanceMaxKm?: number;
  priceMax?: number;
  locationType: 'near-me' | 'destination';
  destination?: string;
  sort?: string;
}

/**
 * Parses a natural language query into structured filters
 */
export function parseNaturalLanguageQuery(query: string): ParsedQuery {
  const lowerQuery = query.toLowerCase();

  // Default values
  const parsed: ParsedQuery = {
    cuisine: [],
    dietary: [],
    locationType: 'near-me', // default to near-me
    sort: 'best-match'
  };

  // Detect location type
  if (lowerQuery.includes('in ') || lowerQuery.includes('at ') ||
      lowerQuery.includes('going to ') || lowerQuery.includes('traveling to ')) {
    parsed.locationType = 'destination';

    // Extract destination (simplified)
    const destinationMatch = lowerQuery.match(/(?:in|at|going to|traveling to)\s+([^.,!?]+)/i);
    if (destinationMatch) {
      parsed.destination = destinationMatch[1].trim();
    }
  }

  // Detect cuisines
  const cuisineKeywords = [
    'vegetarian', 'vegan', 'jain', 'eggless', 'non-vegetarian', 'halal',
    'gluten-free', 'dairy-free', 'indian', 'north indian', 'south indian',
    'maharashtrian', 'punjabi', 'gujarati', 'rajasthani', 'bengali', 'mughlai',
    'chinese', 'thai', 'japanese', 'korean', 'italian', 'mexican',
    'continental', 'mediterranean', 'american', 'arabian', 'turkish',
    'seafood', 'biryani', 'pizza', 'burger', 'street food', 'desserts',
    'cafe', 'bakery'
  ];

  cuisineKeywords.forEach(keyword => {
    if (lowerQuery.includes(keyword)) {
      // Avoid duplicates
      if (!parsed.cuisine.includes(keyword)) {
        parsed.cuisine.push(keyword);
      }
    }
  });

  // Detect dietary preferences (overlap with cuisine but more specific)
  const dietaryKeywords = [
    'vegetarian', 'vegan', 'jain', 'eggless', 'halal',
    'gluten-free', 'dairy-free'
  ];

  dietaryKeywords.forEach(keyword => {
    if (lowerQuery.includes(keyword)) {
      // Avoid duplicates
      if (!parsed.dietary.includes(keyword)) {
        parsed.dietary.push(keyword);
      }
    }
  });

  // Detect rating requirements
  const ratingMatch = lowerQuery.match(/rating\s*(?:above|over|>\s*)?(\d+\.?\d*)/i);
  if (ratingMatch) {
    parsed.ratingMin = parseFloat(ratingMatch[1]);
  }

  // Detect review count requirements
  const reviewsMatch = lowerQuery.match(/(\d+(?:,\d+)?)\s*(?:reviews?|ratings?)/i);
  if (reviewsMatch) {
    const reviewsStr = reviewsMatch[1].replace(/,/g, '');
    parsed.reviewsMin = parseInt(reviewsStr);
  }

  // Detect distance requirements
  const distanceMatch = lowerQuery.match(/within\s+(\d+(?:\.\d+)?)\s*(?:km|kilometers?)/i) ||
                       lowerQuery.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?)\s*(?:away|distance)/i);
  if (distanceMatch) {
    parsed.distanceMaxKm = parseFloat(distanceMatch[1]);
  }

  // Detect price requirements
  const priceMatch = lowerQuery.match(/(?:under|below|less than)\s*[₹$]\s*(\d+(?:\.\d+)?)/i) ||
                    lowerQuery.match(/budget|cheap|inexpensive/i) ||
                    lowerQuery.match(/price\s*(?:under|below|less than)\s*[₹$]\s*(\d+(?:\.\d+)?)/i);
  if (priceMatch) {
    if (priceMatch[1]) {
      parsed.priceMax = parseFloat(priceMatch[1]);
    } else {
      // Budget/cheap - set a low price limit
      parsed.priceMax = 500; // ₹500
    }
  }

  // Detect sorting preferences
  if (lowerQuery.includes('sort by rating') || lowerQuery.includes('highest rated')) {
    parsed.sort = 'rating';
  } else if (lowerQuery.includes('sort by reviews') || lowerQuery.includes('most reviewed')) {
    parsed.sort = 'most-reviewed';
  } else if (lowerQuery.includes('sort by distance') || lowerQuery.includes('closest')) {
    parsed.sort = 'nearest';
  } else if (lowerQuery.includes('sort by price') || lowerQuery.includes('cheapest')) {
    parsed.sort = 'lowest-price';
  }

  return parsed;
}

/**
 * Validates that a parsed query has reasonable values
 */
export function validateParsedQuery(query: ParsedQuery): boolean {
  // Rating should be between 0 and 5
  if (query.ratingMin !== undefined && (query.ratingMin < 0 || query.ratingMin > 5)) {
    return false;
  }

  // Reviews should be non-negative
  if (query.reviewsMin !== undefined && query.reviewsMin < 0) {
    return false;
  }

  // Distance should be non-negative
  if (query.distanceMaxKm !== undefined && query.distanceMaxKm < 0) {
    return false;
  }

  // Price should be non-negative
  if (query.priceMax !== undefined && query.priceMax < 0) {
    return false;
  }

  return true;
}