import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useStoreSettings } from '@/contexts/StoreSettingsContext'
import { useLoading } from '@/contexts/LoadingContext'
import { 
  Store, 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Truck, 
  FileText, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Sun, 
  Moon,
  ChevronDown,
  Store as StoreIcon,
  CreditCard
} from 'lucide-react'
import toast from 'react-hot-toast'

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user, signOut } = useAuth()
  const { settings } = useStoreSettings()
  const { isLoading } = useLoading()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      navigate('/auth')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'POS', href: '/pos', icon: ShoppingCart },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Suppliers', href: '/suppliers', icon: Truck },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Finance', href: '/finance', icon: CreditCard },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const adminNavigation = [
    { name: 'Admin Panel', href: '/admin', icon: User },
    { name: 'Super Admin', href: '/super-admin', icon: StoreIcon },
  ]

  const isActive = (href: string) => location.pathname === href

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen bg-background ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary sidebar transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-primary-hover">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo for dark backgrounds.png" 
                alt="KasheerPlus" 
                className="h-full w-auto"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-light/70 hover:text-light"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`sidebar-item flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href) ? 'sidebar-item-active' : ''
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              )
            })}

            {/* Admin Navigation */}
            {user?.role === 'admin' && (
              <div className="pt-6 border-t border-primary-hover">
                <h3 className="px-4 text-xs font-semibold text-light/50 uppercase tracking-wider mb-2">
                  Administration
                </h3>
                {adminNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`sidebar-item flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive(item.href) ? 'sidebar-item-active' : ''
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </a>
                  )
                })}
              </div>
            )}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-primary-hover">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-light truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-light/70 capitalize">
                  {user?.role || 'user'}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 bg-card-bg topbar border-b border-border-light backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Store Info */}
              {settings && (
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-secondary-bg rounded-lg">
                  <Store className="h-4 w-4 text-accent" />
                                  <span className="text-sm font-medium text-primary">
                  {settings.name}
                </span>
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* User menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 relative z-20">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-35 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AppLayout 