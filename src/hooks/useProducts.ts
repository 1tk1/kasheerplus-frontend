import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import type { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: { name: string } | null
  suppliers?: { name: string } | null
}

export const useProducts = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    if (!user?.store_id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name),
          suppliers (name)
        `)
        .eq('store_id', user.store_id)
        .eq('is_active', true)
        .order('name')

      if (error) throw error

      setProducts(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (productData: Database['public']['Tables']['products']['Insert']) => {
    if (!user?.store_id) throw new Error('No store selected')

    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        store_id: user.store_id,
        created_by: user.id
      })
      .select(`
        *,
        categories (name),
        suppliers (name)
      `)
      .single()

    if (error) throw error

    setProducts(prev => [...prev, data])
    return data
  }

  const updateProduct = async (id: string, updates: Database['public']['Tables']['products']['Update']) => {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        categories (name),
        suppliers (name)
      `)
      .single()

    if (error) throw error

    setProducts(prev => prev.map(p => p.id === id ? data : p))
    return data
  }

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id)

    if (error) throw error

    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const searchProducts = async (query: string) => {
    if (!user?.store_id) return []

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        suppliers (name)
      `)
      .eq('store_id', user.store_id)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,sku.ilike.%${query}%,barcode.ilike.%${query}%`)
      .limit(10)

    if (error) throw error

    return data || []
  }

  useEffect(() => {
    fetchProducts()
  }, [user?.store_id])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    refetch: fetchProducts
  }
}