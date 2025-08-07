import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

export type UserRole = Database['public']['Enums']['user_role']

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  store_id?: string
  name?: string
  avatar_url?: string
  phone?: string
  email_verified?: boolean
  is_active?: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: {
    name: string
    role?: UserRole
    store_name?: string
    phone?: string
  }) => Promise<{ error: any }>
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          stores (
            id,
            name
          )
        `)
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        setLoading(false)
        return
      }

      if (profile) {
        setUser({
          id: profile.id,
          email: authUser.email!,
          role: profile.role,
          store_id: profile.store_id,
          name: profile.name,
          avatar_url: profile.avatar_url,
          phone: profile.phone,
          email_verified: authUser.email_confirmed_at ? true : false,
          is_active: profile.is_active,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        })
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (
    email: string, 
    password: string, 
    userData: {
      name: string
      role?: UserRole
      store_name?: string
      phone?: string
    }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'admin',
            store_name: userData.store_name || 'My Store',
            phone: userData.phone
          }
        }
      })

      if (error) {
        return { error }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          name: updates.name,
          phone: updates.phone,
          avatar_url: updates.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        return { error }
      }

      // Update local user state
      setUser(prev => prev ? { ...prev, ...updates } : null)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error('Error refreshing session:', error)
      } else if (session?.user) {
        await fetchUserProfile(session.user)
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