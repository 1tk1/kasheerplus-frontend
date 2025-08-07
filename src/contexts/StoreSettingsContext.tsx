import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '@/lib/supabase/supabaseClient'
import type { Database } from '@/lib/supabase/types'

export type StoreSettings = Database['public']['Tables']['stores']['Row']

interface StoreSettingsContextType {
  settings: StoreSettings | null
  loading: boolean
  updateSettings: (updates: Partial<StoreSettings>) => Promise<{ error: any }>
  refreshSettings: () => Promise<void>
}

const StoreSettingsContext = createContext<StoreSettingsContextType | undefined>(undefined)

export const useStoreSettings = () => {
  const context = useContext(StoreSettingsContext)
  if (context === undefined) {
    throw new Error('useStoreSettings must be used within a StoreSettingsProvider')
  }
  return context
}

interface StoreSettingsProviderProps {
  children: React.ReactNode
}

export const StoreSettingsProvider: React.FC<StoreSettingsProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    if (!user?.store_id) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', user.store_id)
        .single()

      if (error) {
        console.error('Error fetching store settings:', error)
      } else {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error in fetchSettings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [user?.store_id])

  const updateSettings = async (updates: Partial<StoreSettings>) => {
    if (!user?.store_id) return { error: new Error('No store selected') }

    try {
      const { data, error } = await supabase
        .from('stores')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.store_id)
        .select()
        .single()

      if (error) {
        return { error }
      }

      setSettings(data)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const refreshSettings = async () => {
    await fetchSettings()
  }

  const value: StoreSettingsContextType = {
    settings,
    loading,
    updateSettings,
    refreshSettings,
  }

  return (
    <StoreSettingsContext.Provider value={value}>
      {children}
    </StoreSettingsContext.Provider>
  )
}