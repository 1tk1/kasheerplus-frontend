import React, { createContext, useContext, useEffect, useState } from 'react'

export type UserRole = 'admin' | 'store_owner' | 'general_manager' | 'accountant' | 'cashier' | 'super_admin'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  store_id?: string
  name?: string
  avatar_url?: string
  email_verified?: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: AuthUser | null
  session: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: Partial<AuthUser>) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateProfile: (updates: Partial<AuthUser>) => Promise<{ error: any }>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

// Mock user data for demo
const mockUser: AuthUser = {
  id: '1',
  email: 'admin@kasheerplus.com',
  role: 'admin',
  store_id: 'store-1',
  name: 'Admin User',
  avatar_url: '',
  email_verified: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication
      if (email && password) {
        setUser(mockUser)
        setSession({ user: mockUser })
        return { error: null }
      } else {
        return { error: { message: 'Invalid credentials' } }
      }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, _password: string, userData: Partial<AuthUser>) => {
    try {
      // Mock registration
      const newUser: AuthUser = {
        id: Date.now().toString(),
        email,
        role: userData.role || 'cashier',
        name: userData.name || '',
        avatar_url: '',
        email_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setUser(newUser)
      setSession({ user: newUser })
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const resetPassword = async (_email: string) => {
    try {
      // Mock password reset
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      setUser(prev => prev ? { ...prev, ...updates } : null)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const refreshSession = async () => {
    try {
      // Mock session refresh
      if (user) {
        setSession({ user })
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 