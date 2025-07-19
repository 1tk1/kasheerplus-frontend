import React from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'

const Index: React.FC = () => {
  // Mock data
  const stats = [
    {
      name: 'Total Sales',
      value: '$12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-gradient-accent'
    },
    {
      name: 'Customers',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-gradient-primary'
    },
    {
      name: 'Products',
      value: '567',
      change: '+3.1%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-gradient-accent'
    },
    {
      name: 'Revenue',
      value: '$45,678',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-gradient-primary'
    }
  ]

  const recentSales = [
    {
      id: 1,
      customer: 'Ahmed Ali',
      product: 'iPhone 15 Pro',
      amount: '$1,199',
      status: 'completed',
      time: '2 hours ago'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      product: 'MacBook Air',
      amount: '$1,299',
      status: 'pending',
      time: '4 hours ago'
    },
    {
      id: 3,
      customer: 'Mohammed Hassan',
      product: 'AirPods Pro',
      amount: '$249',
      status: 'completed',
      time: '6 hours ago'
    },
    {
      id: 4,
      customer: 'Emily Davis',
      product: 'iPad Air',
      amount: '$599',
      status: 'cancelled',
      time: '8 hours ago'
    }
  ]

  const quickActions = [
    {
      name: 'New Sale',
      icon: ShoppingCart,
      href: '/pos',
      color: 'bg-gradient-accent'
    },
    {
      name: 'Add Product',
      icon: Package,
      href: '/inventory',
      color: 'bg-gradient-primary'
    },
    {
      name: 'New Customer',
      icon: Users,
      href: '/customers',
      color: 'bg-gradient-accent'
    },
    {
      name: 'Create Invoice',
      icon: FileText,
      href: '/invoices',
      color: 'bg-gradient-primary'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge-success'
      case 'pending':
        return 'badge-warning'
      case 'cancelled':
        return 'badge-error'
      default:
        return 'badge-success'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 bg-secondary-bg rounded-lg">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-text-muted ml-1">from last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-kasheer">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.name}
                href={action.href}
                className="flex flex-col items-center p-4 rounded-xl bg-secondary-bg hover:bg-primary hover:text-light transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-kasheer mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-center">{action.name}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">Recent Sales</h2>
            <a href="/pos" className="text-sm text-accent hover:text-accent-hover font-medium">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-secondary-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{sale.customer}</p>
                    <p className="text-sm text-text-secondary">{sale.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{sale.amount}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(sale.status)}
                    <span className={`badge ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{sale.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">Sales Analytics</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm text-text-secondary">This month</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-secondary-bg rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">Chart component will be implemented here</p>
              <p className="text-sm text-text-muted">Sales data visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-primary mt-1">1,234</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Average Order Value</p>
              <p className="text-2xl font-bold text-primary mt-1">$156.78</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Conversion Rate</p>
              <p className="text-2xl font-bold text-primary mt-1">3.2%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index 