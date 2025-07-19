import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Plus, Minus, X, ArrowLeft, Calculator, RotateCcw, Keyboard, Maximize2 } from 'lucide-react'

const POS: React.FC = () => {
  return (
    <div className="h-full w-full">
      {/* Header with shortcuts */}
      <header className="bg-card-bg border-b border-border-light">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 sm:px-4 lg:px-6 py-4 gap-2 sm:gap-4">
          {/* Title and navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
            <button className="p-2 rounded-md hover:bg-secondary-bg text-primary">
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                POS System
              </h1>
              <p className="text-text-secondary text-sm">Process sales and payments</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 w-full md:w-auto">
            <div className="card p-3 cursor-pointer hover:shadow-kasheer-lg hover:scale-105 transition-all duration-200">
              <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Returns</span>
              </button>
            </div>
            <div className="card p-3 cursor-pointer hover:shadow-kasheer-lg hover:scale-105 transition-all duration-200">
              <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm">
                <Keyboard className="w-4 h-4" />
                <span>Shortcuts</span>
              </button>
            </div>
            <div className="card p-3 cursor-pointer hover:shadow-kasheer-lg hover:scale-105 transition-all duration-200">
              <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm">
                <Maximize2 className="w-4 h-4" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* POS Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-4 lg:p-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search products by name or barcode..."
                className="w-full pl-10 pr-4 py-3 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Sample Products */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-secondary-bg rounded-lg p-4 cursor-pointer hover:bg-primary-hover transition-colors">
                <div className="w-full h-24 bg-secondary-bg rounded-md mb-3"></div>
                <h3 className="font-medium text-sm text-text-primary">Product {item}</h3>
                <p className="text-sm text-text-secondary">$19.99</p>
                <p className="text-xs text-text-muted">In Stock: 25</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Cart</h2>
            <ShoppingCart className="h-5 w-5 text-text-muted" />
          </div>

          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-bg rounded-md"></div>
                <div>
                  <p className="font-medium text-sm text-text-primary">Product 1</p>
                  <p className="text-sm text-text-secondary">$19.99</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-primary-hover text-text-primary">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-text-primary">2</span>
                <button className="p-1 rounded hover:bg-primary-hover text-text-primary">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="p-1 rounded hover:bg-primary-hover text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-bg rounded-md"></div>
                <div>
                  <p className="font-medium text-sm text-text-primary">Product 2</p>
                  <p className="text-sm text-text-secondary">$29.99</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-primary-hover text-text-primary">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-text-primary">1</span>
                <button className="p-1 rounded hover:bg-primary-hover text-text-primary">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="p-1 rounded hover:bg-primary-hover text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="space-y-3 border-t border-border-light pt-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium text-text-primary">$69.97</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Tax (10%)</span>
              <span className="font-medium text-text-primary">$7.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-text-primary">
              <span>Total</span>
              <span>$76.97</span>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3 mt-6">
            <button className="w-full bg-accent text-white py-3 rounded-md font-medium hover:bg-accent-hover transition-colors">
              Process Payment
            </button>
            <button className="w-full bg-secondary-bg text-text-primary py-3 rounded-md font-medium hover:bg-red-100 hover:text-red-600 transition-colors">
              Hold Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS 