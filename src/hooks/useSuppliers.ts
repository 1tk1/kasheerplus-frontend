import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import type { Database } from '@/lib/supabase/types'

type Supplier = Database['public']['Tables']['suppliers']['Row']

export const useSuppliers = () => {
  const { user } = useAuth()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSuppliers = async () => {
    if (!user?.store_id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('store_id', user.store_id)
        .eq('is_active', true)
        .order('name')

      if (error) throw error

      setSuppliers(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addSupplier = async (supplierData: Omit<Database['public']['Tables']['suppliers']['Insert'], 'store_id' | 'created_by'>) => {
    if (!user?.store_id) throw new Error('No store selected')

    const { data, error } = await supabase
      .from('suppliers')
      .insert({
        ...supplierData,
        store_id: user.store_id,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error

    setSuppliers(prev => [...prev, data])
    return data
  }

  const updateSupplier = async (id: string, updates: Database['public']['Tables']['suppliers']['Update']) => {
    const { data, error } = await supabase
      .from('suppliers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setSuppliers(prev => prev.map(s => s.id === id ? data : s))
    return data
  }

  const deleteSupplier = async (id: string) => {
    const { error } = await supabase
      .from('suppliers')
      .update({ is_active: false })
      .eq('id', id)

    if (error) throw error

    setSuppliers(prev => prev.filter(s => s.id !== id))
  }

  useEffect(() => {
    fetchSuppliers()
  }, [user?.store_id])

  return {
    suppliers,
    loading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    refetch: fetchSuppliers
  }
}