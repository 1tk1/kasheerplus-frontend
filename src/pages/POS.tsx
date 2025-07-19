import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Plus, Minus, X, ArrowLeft, Calculator } from 'lucide-react'

const POS: React.FC = () => {
  return (
    <div className="h-full w-full">
      {/* Header with shortcuts */}
      <header className="bg-card border-b border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 sm:px-4 lg:px-6 py-4 gap-2 sm:gap-4">
          {/* Title and navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
            <button className="p-2 rounded-md hover:bg-muted text-foreground">
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                POS System
              </h1>
              <p className="text-muted-foreground text-sm">Process sales and payments</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-2 sm:gap-3 w-full md:w-auto">
            <button className="flex items-center space-x-2 bg-muted text-foreground px-3 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm">
              <span>Returns</span>
            </button>
            <button className="flex items-center space-x-2 bg-muted text-foreground px-3 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm">
              <span>Shortcuts</span>
            </button>
            <button className="flex items-center space-x-2 bg-muted text-foreground px-3 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm">
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </header>

      {/* POS Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-4 lg:p-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name or barcode..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Sample Products */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-muted/50 rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                <div className="w-full h-24 bg-muted rounded-md mb-3"></div>
                <h3 className="font-medium text-sm text-foreground">Product {item}</h3>
                <p className="text-sm text-muted-foreground">$19.99</p>
                <p className="text-xs text-muted-foreground">In Stock: 25</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Cart</h2>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-md"></div>
                <div>
                  <p className="font-medium text-sm text-foreground">Product 1</p>
                  <p className="text-sm text-muted-foreground">$19.99</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-muted text-foreground">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-foreground">2</span>
                <button className="p-1 rounded hover:bg-muted text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="p-1 rounded hover:bg-muted text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-md"></div>
                <div>
                  <p className="font-medium text-sm text-foreground">Product 2</p>
                  <p className="text-sm text-muted-foreground">$29.99</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-muted text-foreground">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-foreground">1</span>
                <button className="p-1 rounded hover:bg-muted text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="p-1 rounded hover:bg-muted text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">$69.97</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span className="font-medium text-foreground">$7.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>$76.97</span>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3 mt-6">
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Process Payment
            </button>
            <button className="w-full bg-muted text-foreground py-3 rounded-md font-medium hover:bg-muted/80 transition-colors">
              Hold Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS 