import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Plus, Minus, X, ArrowLeft, Calculator, RotateCcw, Keyboard, Package, Percent, User, Tag } from 'lucide-react'
import { useState } from 'react'
import { useRef } from 'react';

const POS: React.FC = () => {
  // Sample products
  const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
    { id: 4, name: 'Product 4', price: 49.99 },
    { id: 5, name: 'Product 5', price: 59.99 },
    { id: 6, name: 'Product 6', price: 69.99 },
    { id: 7, name: 'Product 7', price: 79.99 },
    { id: 8, name: 'Product 8', price: 89.99 },
  ]
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([])
  const [hideProducts, setHideProducts] = useState(false);
  const [discount, setDiscount] = useState('');
  const [customer, setCustomer] = useState('');
  const [numpadTarget, setNumpadTarget] = useState<'discount' | 'customer' | 'barcode' | null>(null);
  // barcodeMode, barcodeInput, barcodeProduct removed
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const addToCart = (product: {id: number, name: string, price: number}) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      if (idx !== -1) {
        const updated = [...prev]
        updated[idx].qty += 1
        return updated
      } else {
        return [...prev, { ...product, qty: 1 }]
      }
    })
  }
  const increaseQty = (id: number) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p))
  }
  const decreaseQty = (id: number) => {
    setCart(prev => prev.flatMap(p => p.id === id ? (p.qty > 1 ? [{ ...p, qty: p.qty - 1 }] : []) : [p]))
  }
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

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
              <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm whitespace-nowrap" onClick={() => setHideProducts(v => !v)}>
                <X className="w-4 h-4" />
                <span>{hideProducts ? 'Show Products' : 'Hide Products'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* POS Content Grid */}
      <div className="p-4 lg:p-6">
        {/* Always show search input at the top */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products by name or barcode..."
              className="w-full pl-10 pr-4 py-3 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Product Selection or Numpad */}
          <div className="lg:col-span-2 flex flex-col md:flex-row gap-6 items-stretch">
            {/* Product Selection */}
            {!hideProducts && (
              <div className="flex-1 bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-secondary-bg rounded-lg p-4 cursor-pointer hover:bg-primary-hover transition-colors" onClick={() => addToCart(product)}>
                      <div className="w-full h-24 product-placeholder mb-3">
                        <Package className="w-12 h-12 icon" />
                      </div>
                      <h3 className="font-medium text-sm text-text-primary">{product.name}</h3>
                      <p className="text-sm text-text-secondary">${product.price.toFixed(2)}</p>
                      <p className="text-xs text-text-muted">In Stock: 25</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Numpad only if products are hidden */}
            {hideProducts && (
              <div className="flex-1 flex flex-col items-center justify-center bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer min-h-[400px]">
                {/* Numpad Controls */}
                <div className="mb-4 w-full flex justify-center gap-2">
                  <button className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'discount' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} onClick={() => setNumpadTarget('discount')}><Percent className="w-4 h-4 inline" /> Discount</button>
                  <button className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'customer' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} onClick={() => setNumpadTarget('customer')}><User className="w-4 h-4 inline" /> Customer</button>
                  <button className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'barcode' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} onClick={() => {
                    setNumpadTarget('barcode');
                    if (searchInputRef.current) {
                      searchInputRef.current.focus();
                    }
                  }}><Tag className="w-4 h-4 inline" /> Barcode</button>
                </div>
                <div className="grid grid-cols-3 gap-3 w-64 mb-4">
                  {/* Row 1 */}
                  {[1,2,3].map((n) => (
                    <button key={n} className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" onClick={() => {
                      if (numpadTarget === 'discount') setDiscount(d => d + n.toString());
                      else if (numpadTarget === 'customer') setCustomer(c => c + n.toString());
                      else if (numpadTarget === 'barcode') setSearch(s => s + n.toString());
                    }}>{n}</button>
                  ))}
                  {/* Row 2 */}
                  {[4,5,6].map((n) => (
                    <button key={n} className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" onClick={() => {
                      if (numpadTarget === 'discount') setDiscount(d => d + n.toString());
                      else if (numpadTarget === 'customer') setCustomer(c => c + n.toString());
                      else if (numpadTarget === 'barcode') setSearch(s => s + n.toString());
                    }}>{n}</button>
                  ))}
                  {/* Row 3 */}
                  {[7,8,9].map((n) => (
                    <button key={n} className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" onClick={() => {
                      if (numpadTarget === 'discount') setDiscount(d => d + n.toString());
                      else if (numpadTarget === 'customer') setCustomer(c => c + n.toString());
                      else if (numpadTarget === 'barcode') setSearch(s => s + n.toString());
                    }}>{n}</button>
                  ))}
                  {/* Row 4: 0 and Enter (col-span-2) */}
                  <button className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" onClick={() => {
                    if (numpadTarget === 'discount') setDiscount(d => d + '0');
                    else if (numpadTarget === 'customer') setCustomer(c => c + '0');
                    else if (numpadTarget === 'barcode') setSearch(s => s + '0');
                  }}>0</button>
                  <button className="bg-accent text-white text-xl font-bold rounded-lg p-4 hover:bg-accent-hover transition col-span-2" onClick={() => {
                    if (numpadTarget === 'barcode' && searchInputRef.current) {
                      const found = products.find(p => p.id.toString() === search || p.name.toLowerCase().includes(search.toLowerCase()));
                      if (found) {
                        addToCart(found);
                      }
                    }
                  }}>Enter</button>
                  {/* Row 5: Del (col-span-2), Clear (col-span-2) */}
                  <button className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" onClick={() => {
                    if (numpadTarget === 'discount') setDiscount(d => d.slice(0, -1));
                    else if (numpadTarget === 'customer') setCustomer(c => c.slice(0, -1));
                    else if (numpadTarget === 'barcode') setSearch(s => s.slice(0, -1));
                  }}>Del</button>
                  <button className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition col-span-2" onClick={() => {
                    if (numpadTarget === 'discount') setDiscount('');
                    else if (numpadTarget === 'customer') setCustomer('');
                    else if (numpadTarget === 'barcode') setSearch('');
                  }}>Clear</button>
                </div>
              </div>
            )}
          </div>
          {/* Cart */}
          <div className="bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
            {/* Customer input above cart */}
            <div className="mb-4">
              <label className="text-sm font-medium text-text-primary">Customer Mobile</label>
              <input type="text" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Enter mobile number" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Cart</h2>
              <ShoppingCart className="h-5 w-5 text-text-muted" />
            </div>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.length === 0 && (
                <div className="text-center text-text-muted py-8">Cart is empty</div>
              )}
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-secondary-bg rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 product-placeholder">
                      <Package className="w-5 h-5 icon" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-text-primary">{item.name}</p>
                      <p className="text-sm text-text-secondary">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => decreaseQty(item.id)}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-text-primary">{item.qty}</span>
                    <button className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => increaseQty(item.id)}>
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Summary */}
            <div className="space-y-3 border-t border-border-light pt-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Discount</span>
                <span className="font-medium text-text-primary">{discount ? `-${discount}%` : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text-primary">${cart.reduce((sum, p) => sum + p.price * p.qty, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax (10%)</span>
                <span className="font-medium text-text-primary">${(cart.reduce((sum, p) => sum + p.price * p.qty, 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-text-primary">
                <span>Total</span>
                <span>${(cart.reduce((sum, p) => sum + p.price * p.qty, 0) * 1.1).toFixed(2)}</span>
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
    </div>
  );
}

export default POS; 