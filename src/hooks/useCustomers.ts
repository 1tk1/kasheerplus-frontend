import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import type { Database } from '@/lib/supabase/types'

type Customer = Database['public']['Tables']['customers']['Row']

export const useCustomers = () => {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomers = async () => {
    if (!user?.store_id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('store_id', user.store_id)
        .order('name')

      if (error) throw error

      setCustomers(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addCustomer = async (customerData: Omit<Database['public']['Tables']['customers']['Insert'], 'store_id' | 'created_by'>) => {
    if (!user?.store_id) throw new Error('No store selected')

    const { data, error } = await supabase
      .from('customers')
      .insert({
        ...customerData,
        store_id: user.store_id,
        created_by: user.id
      })
      .select()
      .single()

    if (error) throw error

    setCustomers(prev => [...prev, data])
    return data
  }

  const updateCustomer = async (id: string, updates: Database['public']['Tables']['customers']['Update']) => {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setCustomers(prev => prev.map(c => c.id === id ? data : c))
    return data
  }

  const deleteCustomer = async (id: string) => {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) throw error

    setCustomers(prev => prev.filter(c => c.id !== id))
  }

  const searchCustomers = async (query: string) => {
    if (!user?.store_id) return []

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('store_id', user.store_id)
      .or(`name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(10)

    if (error) throw error

    return data || []
  }

  useEffect(() => {
    fetchCustomers()
  }, [user?.store_id])

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    refetch: fetchCustomers
  }
}