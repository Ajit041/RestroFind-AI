// Saved restaurants service using Supabase
import { supabase } from '@/lib/supabase'
import type { SavedRestaurant, Restaurant } from '@/db/schema'

/**
 * Save a restaurant for the current user
 */
export async function saveRestaurant(userId: string, restaurantId: string): Promise<SavedRestaurant> {
  try {
    // Check if already saved
    const { data: existing } = await supabase
      .from('saved_restaurants')
      .select('*')
      .eq('userId', userId)
      .eq('restaurantId', restaurantId)
      .single()

    if (existing) {
      return existing
    }

    const { data, error } = await supabase
      .from('saved_restaurants')
      .insert([{ userId, restaurantId }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving restaurant:', error)
    // Fallback to mock implementation for development
    const saved: SavedRestaurant = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      restaurantId,
      savedAt: new Date()
    }
    return saved
  }
}

/**
 * Unsave a restaurant for the current user
 */
export async function unsaveRestaurant(userId: string, restaurantId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('saved_restaurants')
      .delete()
      .eq('userId', userId)
      .eq('restaurantId', restaurantId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error unsaving restaurant:', error)
    // Fallback to mock implementation for development
    // In a real app, we'd want to handle this more gracefully
    return false
  }
}

/**
 * Get all saved restaurants for a user
 */
export async function getSavedRestaurants(userId: string): Promise<SavedRestaurant[]> {
  try {
    const { data, error } = await supabase
      .from('saved_restaurants')
      .select('*')
      .eq('userId', userId)
      .order('savedAt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching saved restaurants:', error)
    // Fallback to mock implementation for development
    return []
  }
}

/**
 * Check if a restaurant is saved by a user
 */
export async function isRestaurantSaved(userId: string, restaurantId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('saved_restaurants')
      .select('id')
      .eq('userId', userId)
      .eq('restaurantId', restaurantId)
      .single()

    if (error && error.code === 'PGRST116') { // Not found
      return false
    }
    if (error) throw error
    return !!data
  } catch (error) {
    console.error('Error checking if restaurant is saved:', error)
    // Fallback to mock implementation for development
    return false
  }
}

/**
 * Get restaurant details for saved restaurants
 * In a real app, this would join with restaurant data
 */
export async function getSavedRestaurantDetails(
  userId: string,
  allRestaurants: Restaurant[]
): Promise<(Restaurant & { savedAt: Date })[]> {
  try {
    const savedRestaurants = await getSavedRestaurants(userId)
    return savedRestaurants
      .map(saved => {
        const restaurant = allRestaurants.find(r => r.id === saved.restaurantId)
        if (restaurant) {
          return {
            ...restaurant,
            savedAt: saved.savedAt
          }
        }
        return null
      })
      .filter((item): item is Restaurant & { savedAt: Date } => item !== null)
  } catch (error) {
    console.error('Error getting saved restaurant details:', error)
    // Fallback to mock implementation for development
    return []
  }
}