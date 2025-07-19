import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

export interface StoreSettings {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  currency: string
  timezone: string
  logo_url?: string
  theme: 'light' | 'dark' | 'auto'
  language: string
  tax_rate: number
  receipt_template: string
  created_at: string
  updated_at: string
}

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

// Mock store settings
const mockSettings: StoreSettings = {
  id: 'store-1',
  name: 'KasheerPlus Store',
  address: '123 Main Street, City, Country',
  phone: '+1 (555) 123-4567',
  email: 'store@kasheerplus.com',
  currency: 'USD',
  timezone: 'UTC',
  logo_url: '',
  theme: 'auto',
  language: 'en',
  tax_rate: 10,
  receipt_template: 'default',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const StoreSettingsProvider: React.FC<StoreSettingsProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    // Simulate API call
    setTimeout(() => {
      setSettings(mockSettings)
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    if (user?.store_id) {
      fetchSettings()
    } else {
      setLoading(false)
    }
  }, [user?.store_id])

  const updateSettings = async (updates: Partial<StoreSettings>) => {
    if (!user?.store_id) return { error: new Error('No store selected') }

    try {
      setSettings(prev => prev ? { ...prev, ...updates } : null)
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