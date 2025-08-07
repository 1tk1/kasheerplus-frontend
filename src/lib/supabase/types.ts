export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          logo_url: string | null
          currency: string
          timezone: string
          tax_rate: number
          return_period_days: number
          theme: string
          language: string
          receipt_template: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          currency?: string
          timezone?: string
          tax_rate?: number
          return_period_days?: number
          theme?: string
          language?: string
          receipt_template?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          currency?: string
          timezone?: string
          tax_rate?: number
          return_period_days?: number
          theme?: string
          language?: string
          receipt_template?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          store_id: string | null
          name: string
          role: 'super_admin' | 'admin' | 'store_owner' | 'general_manager' | 'accountant' | 'cashier'
          avatar_url: string | null
          phone: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          store_id?: string | null
          name: string
          role?: 'super_admin' | 'admin' | 'store_owner' | 'general_manager' | 'accountant' | 'cashier'
          avatar_url?: string | null
          phone?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string | null
          name?: string
          role?: 'super_admin' | 'admin' | 'store_owner' | 'general_manager' | 'accountant' | 'cashier'
          avatar_url?: string | null
          phone?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          store_id: string
          name: string
          description: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          description?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          store_id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          contact_person: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          contact_person?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          contact_person?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          store_id: string
          category_id: string | null
          supplier_id: string | null
          name: string
          description: string | null
          sku: string
          barcode: string | null
          cost_price: number
          selling_price: number
          stock_quantity: number
          min_stock_threshold: number
          images: string[]
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          category_id?: string | null
          supplier_id?: string | null
          name: string
          description?: string | null
          sku: string
          barcode?: string | null
          cost_price?: number
          selling_price: number
          stock_quantity?: number
          min_stock_threshold?: number
          images?: string[]
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          category_id?: string | null
          supplier_id?: string | null
          name?: string
          description?: string | null
          sku?: string
          barcode?: string | null
          cost_price?: number
          selling_price?: number
          stock_quantity?: number
          min_stock_threshold?: number
          images?: string[]
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          store_id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          date_of_birth: string | null
          total_purchases: number
          total_orders: number
          last_purchase_date: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          total_purchases?: number
          total_orders?: number
          last_purchase_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          total_purchases?: number
          total_orders?: number
          last_purchase_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          store_id: string
          customer_id: string | null
          invoice_number: string
          invoice_date: string
          due_date: string | null
          subtotal: number
          tax_amount: number
          discount_amount: number
          total_amount: number
          paid_amount: number
          status: 'draft' | 'paid' | 'unpaid' | 'cancelled' | 'refunded'
          payment_method: 'cash' | 'card' | 'bank_transfer' | 'mobile_payment' | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          customer_id?: string | null
          invoice_number: string
          invoice_date?: string
          due_date?: string | null
          subtotal?: number
          tax_amount?: number
          discount_amount?: number
          total_amount?: number
          paid_amount?: number
          status?: 'draft' | 'paid' | 'unpaid' | 'cancelled' | 'refunded'
          payment_method?: 'cash' | 'card' | 'bank_transfer' | 'mobile_payment' | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          customer_id?: string | null
          invoice_number?: string
          invoice_date?: string
          due_date?: string | null
          subtotal?: number
          tax_amount?: number
          discount_amount?: number
          total_amount?: number
          paid_amount?: number
          status?: 'draft' | 'paid' | 'unpaid' | 'cancelled' | 'refunded'
          payment_method?: 'cash' | 'card' | 'bank_transfer' | 'mobile_payment' | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          product_id: string
          quantity: number
          unit_price: number
          discount_amount: number
          total_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          product_id: string
          quantity: number
          unit_price: number
          discount_amount?: number
          total_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          discount_amount?: number
          total_amount?: number
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          store_id: string
          category: string
          description: string
          amount: number
          expense_date: string
          receipt_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          category: string
          description: string
          amount: number
          expense_date?: string
          receipt_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          category?: string
          description?: string
          amount?: number
          expense_date?: string
          receipt_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: {
        Args: {
          store_uuid: string
        }
        Returns: string
      }
    }
    Enums: {
      user_role: 'super_admin' | 'admin' | 'store_owner' | 'general_manager' | 'accountant' | 'cashier'
      invoice_status: 'draft' | 'paid' | 'unpaid' | 'cancelled' | 'refunded'
      movement_type: 'sale' | 'purchase' | 'adjustment' | 'return' | 'transfer'
      payment_method: 'cash' | 'card' | 'bank_transfer' | 'mobile_payment'
    }
  }
}