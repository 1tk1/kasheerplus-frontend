import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import type { Database } from '@/lib/supabase/types'

type Invoice = Database['public']['Tables']['invoices']['Row'] & {
  customers?: { name: string; phone: string } | null
  invoice_items?: Array<{
    id: string
    product_id: string
    quantity: number
    unit_price: number
    discount_amount: number
    total_amount: number
    products: {
      name: string
      sku: string
    }
  }>
}

type InvoiceItem = {
  product_id: string
  quantity: number
  unit_price: number
  discount_amount?: number
  total_amount: number
}

export const useInvoices = () => {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInvoices = async () => {
    if (!user?.store_id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customers (name, phone),
          invoice_items (
            id,
            product_id,
            quantity,
            unit_price,
            discount_amount,
            total_amount,
            products (name, sku)
          )
        `)
        .eq('store_id', user.store_id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setInvoices(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async (
    invoiceData: Omit<Database['public']['Tables']['invoices']['Insert'], 'store_id' | 'created_by' | 'invoice_number'>,
    items: InvoiceItem[]
  ) => {
    if (!user?.store_id) throw new Error('No store selected')

    try {
      // Generate invoice number
      const { data: invoiceNumber, error: numberError } = await supabase
        .rpc('generate_invoice_number', { store_uuid: user.store_id })

      if (numberError) throw numberError

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          ...invoiceData,
          store_id: user.store_id,
          created_by: user.id,
          invoice_number: invoiceNumber
        })
        .select()
        .single()

      if (invoiceError) throw invoiceError

      // Create invoice items
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems)

      if (itemsError) throw itemsError

      // Fetch the complete invoice with items
      const { data: completeInvoice, error: fetchError } = await supabase
        .from('invoices')
        .select(`
          *,
          customers (name, phone),
          invoice_items (
            id,
            product_id,
            quantity,
            unit_price,
            discount_amount,
            total_amount,
            products (name, sku)
          )
        `)
        .eq('id', invoice.id)
        .single()

      if (fetchError) throw fetchError

      setInvoices(prev => [completeInvoice, ...prev])
      return completeInvoice
    } catch (error) {
      throw error
    }
  }

  const updateInvoice = async (id: string, updates: Database['public']['Tables']['invoices']['Update']) => {
    const { data, error } = await supabase
      .from('invoices')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        customers (name, phone),
        invoice_items (
          id,
          product_id,
          quantity,
          unit_price,
          discount_amount,
          total_amount,
          products (name, sku)
        )
      `)
      .single()

    if (error) throw error

    setInvoices(prev => prev.map(inv => inv.id === id ? data : inv))
    return data
  }

  const deleteInvoice = async (id: string) => {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)

    if (error) throw error

    setInvoices(prev => prev.filter(inv => inv.id !== id))
  }

  useEffect(() => {
    fetchInvoices()
  }, [user?.store_id])

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    refetch: fetchInvoices
  }
}