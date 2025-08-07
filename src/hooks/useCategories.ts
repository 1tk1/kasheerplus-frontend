import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import type { Database } from '@/lib/supabase/types'

type Category = Database['public']['Tables']['categories']['Row']

export const useCategories = () => {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    if (!user?.store_id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', user.store_id)
        .order('name')

      if (error) throw error

      setCategories(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addCategory = async (name: string, description?: string) => {
    if (!user?.store_id) throw new Error('No store selected')

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name,
        description,
        store_id: user.store_id,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error

    setCategories(prev => [...prev, data])
    return data
  }

  const updateCategory = async (id: string, updates: { name?: string; description?: string }) => {
    const { data, error } = await supabase
      .from('categories')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setCategories(prev => prev.map(c => c.id === id ? data : c))
    return data
  }

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error

    setCategories(prev => prev.filter(c => c.id !== id))
  }

  useEffect(() => {
    fetchCategories()
  }, [user?.store_id])

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories
  }
}