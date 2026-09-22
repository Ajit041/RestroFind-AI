// Search history service using Supabase
import { supabase } from '@/lib/supabase'
import type { SearchHistory } from '@/db/schema'

/**
 * Add a search to the history
 */
export async function addSearchToHistory(
  userId: string,
  query: string,
  locationType: 'near-me' | 'destination',
  destination: string | undefined,
  resultsCount: number
): Promise<SearchHistory> {
  try {
    const historyItem: SearchHistory = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      query,
      locationType,
      destination,
      resultsCount,
      searchedAt: new Date()
    }

    const { data, error } = await supabase
      .from('search_history')
      .insert([historyItem])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding search to history:', error)
    // Fallback to mock implementation for development
    const historyItem: SearchHistory = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      query,
      locationType,
      destination,
      resultsCount,
      searchedAt: new Date()
    }
    return historyItem
  }
}

/**
 * Get search history for a user
 */
export async function getSearchHistory(userId: string): Promise<SearchHistory[]> {
  try {
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('userId', userId)
      .order('searchedAt', { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching search history:', error)
    // Fallback to mock implementation for development
    return []
  }
}

/**
 * Clear search history for a user
 */
export async function clearSearchHistory(userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('userId', userId)

    if (error) throw error
  } catch (error) {
    console.error('Error clearing search history:', error)
    // Fallback to mock implementation for development
    // In a real app, we might want to handle this differently
  }
}