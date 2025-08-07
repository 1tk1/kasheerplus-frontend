import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Plus, Minus, X, ArrowLeft, Calculator, RotateCcw, Keyboard, Package, Percent, User, Tag } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCustomers } from '@/hooks/useCustomers'
import { useInvoices } from '@/hooks/useInvoices'
import { useStoreSettings } from '@/contexts/StoreSettingsContext'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  stock: number
}

const POS: React.FC = () => {
  const { products, searchProducts } = useProducts()
  const { customers, searchCustomers } = useCustomers()
  const { createInvoice } = useInvoices()
  const { settings } = useStoreSettings()
  
  const [cart, setCart] = useState<CartItem[]>([])
  const [hideProducts, setHideProducts] = useState(false)
  const [discount, setDiscount] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [customerSearch, setCustomerSearch] = useState('')
  const [numpadTarget, setNumpadTarget] = useState<'discount' | 'customer' | 'barcode' | null>(null)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showCustomerResults, setShowCustomerResults] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'bank_transfer' | 'mobile_payment'>('cash')
  const [processing, setProcessing] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleProductSearch = async (query: string) => {
    setSearch(query)
    if (query.length > 2) {
      try {
        const results = await searchProducts(query)
        setSearchResults(results)
      } catch (error) {
        console.error('Search error:', error)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleCustomerSearch = async (query: string) => {
    setCustomerSearch(query)
    if (query.length > 2) {
      try {
        const results = await searchCustomers(query)
        setSearchResults(results)
        setShowCustomerResults(true)
      } catch (error) {
        console.error('Customer search error:', error)
      }
    } else {
      setSearchResults([])
      setShowCustomerResults(false)
    }
  }

  const addToCart = (product: any) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        if (existingItem.qty >= product.stock_quantity) {
          toast.error('Not enough stock available')
          return prev
        }
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      } else {
        if (product.stock_quantity <= 0) {
          toast.error('Product is out of stock')
          return prev
        }
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.selling_price,
          qty: 1,
          stock: product.stock_quantity
        }]
      }
    })
    
    // Clear search
    setSearch('')
    setSearchResults([])
  }

  const selectCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setCustomerSearch(customer.name)
    setShowCustomerResults(false)
    setSearchResults([])
  }

  const increaseQty = (id: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        if (item.qty >= item.stock) {
          toast.error('Not enough stock available')
          return item
        }
        return { ...item, qty: item.qty + 1 }
      }
      return item
    }))
  }

  const decreaseQty = (id: string) => {
    setCart(prev => prev.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ).filter(item => item.qty > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
    const discountAmount = discount ? (subtotal * parseFloat(discount)) / 100 : 0
    const discountedSubtotal = subtotal - discountAmount
    const taxRate = settings?.tax_rate || 0
    const taxAmount = (discountedSubtotal * taxRate) / 100
    const total = discountedSubtotal + taxAmount

    return {
      subtotal,
      discountAmount,
      taxAmount,
      total
    }
  }

  const processPayment = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    setProcessing(true)
    
    try {
      const totals = calculateTotals()
      
      const invoiceData = {
        customer_id: selectedCustomer?.id || null,
        subtotal: totals.subtotal,
        tax_amount: totals.taxAmount,
        discount_amount: totals.discountAmount,
        total_amount: totals.total,
        paid_amount: totals.total,
        status: 'paid' as const,
        payment_method: paymentMethod,
        notes: null
      }

      const invoiceItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.qty,
        unit_price: item.price,
        discount_amount: 0,
        total_amount: item.price * item.qty
      }))

      await createInvoice(invoiceData, invoiceItems)
      
      toast.success('Payment processed successfully!')
      
      // Clear cart and reset form
      setCart([])
      setSelectedCustomer(null)
      setCustomerSearch('')
      setDiscount('')
      setSearch('')
      
    } catch (error) {
      toast.error('Failed to process payment')
      console.error('Payment error:', error)
    } finally {
      setProcessing(false)
    }
  }

  const totals = calculateTotals()

  return (
    <div className="h-full w-full">
      {/* Header */}
      <header className="bg-card-bg border-b border-border-light">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 sm:px-4 lg:px-6 py-4 gap-2 sm:gap-4">
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
              <button 
                className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm whitespace-nowrap" 
                onClick={() => setHideProducts(v => !v)}
              >
                <X className="w-4 h-4" />
                <span>{hideProducts ? 'Show Products' : 'Hide Products'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6">
        {/* Search */}
        <div className="mb-6 max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products by name, SKU, or barcode..."
              className="w-full pl-10 pr-4 py-3 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              value={search}
              onChange={e => handleProductSearch(e.target.value)}
            />
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && !showCustomerResults && (
            <div className="absolute top-full left-0 right-0 bg-card-bg border border-border-light rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="p-3 hover:bg-secondary-bg cursor-pointer border-b border-border-light last:border-b-0"
                  onClick={() => addToCart(product)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">{product.name}</p>
                      <p className="text-sm text-text-secondary">SKU: {product.sku} | Stock: {product.stock_quantity}</p>
                    </div>
                    <p className="font-semibold text-accent">${product.selling_price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Product Selection or Numpad */}
          <div className="lg:col-span-2 flex flex-col md:flex-row gap-6 items-stretch">
            {!hideProducts && (
              <div className="flex-1 bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.slice(0, 12).map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-secondary-bg rounded-lg p-4 cursor-pointer hover:bg-primary-hover transition-colors" 
                      onClick={() => addToCart(product)}
                    >
                      <div className="w-full h-24 product-placeholder mb-3">
                        <Package className="w-12 h-12 icon" />
                      </div>
                      <h3 className="font-medium text-sm text-text-primary">{product.name}</h3>
                      <p className="text-sm text-text-secondary">${product.selling_price.toFixed(2)}</p>
                      <p className="text-xs text-text-muted">Stock: {product.stock_quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hideProducts && (
              <div className="flex-1 flex flex-col items-center justify-center bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer min-h-[400px]">
                <div className="mb-4 w-full flex justify-center gap-2">
                  <button 
                    className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'discount' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} 
                    onClick={() => setNumpadTarget('discount')}
                  >
                    <Percent className="w-4 h-4 inline" /> Discount
                  </button>
                  <button 
                    className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'customer' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} 
                    onClick={() => setNumpadTarget('customer')}
                  >
                    <User className="w-4 h-4 inline" /> Customer
                  </button>
                  <button 
                    className={`px-3 py-1 rounded font-semibold text-sm ${numpadTarget === 'barcode' ? 'bg-accent text-white' : 'bg-muted text-accent'}`} 
                    onClick={() => {
                      setNumpadTarget('barcode')
                      if (searchInputRef.current) {
                        searchInputRef.current.focus()
                      }
                    }}
                  >
                    <Tag className="w-4 h-4 inline" /> Barcode
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 w-64 mb-4">
                  {[1,2,3,4,5,6,7,8,9].map((n) => (
                    <button 
                      key={n} 
                      className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" 
                      onClick={() => {
                        if (numpadTarget === 'discount') setDiscount(d => d + n.toString())
                        else if (numpadTarget === 'customer') setCustomerSearch(c => c + n.toString())
                        else if (numpadTarget === 'barcode') handleProductSearch(search + n.toString())
                      }}
                    >
                      {n}
                    </button>
                  ))}
                  <button 
                    className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" 
                    onClick={() => {
                      if (numpadTarget === 'discount') setDiscount(d => d + '0')
                      else if (numpadTarget === 'customer') setCustomerSearch(c => c + '0')
                      else if (numpadTarget === 'barcode') handleProductSearch(search + '0')
                    }}
                  >
                    0
                  </button>
                  <button 
                    className="bg-accent text-white text-xl font-bold rounded-lg p-4 hover:bg-accent-hover transition col-span-2"
                  >
                    Enter
                  </button>
                  <button 
                    className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition" 
                    onClick={() => {
                      if (numpadTarget === 'discount') setDiscount(d => d.slice(0, -1))
                      else if (numpadTarget === 'customer') setCustomerSearch(c => c.slice(0, -1))
                      else if (numpadTarget === 'barcode') handleProductSearch(search.slice(0, -1))
                    }}
                  >
                    Del
                  </button>
                  <button 
                    className="bg-secondary-bg text-xl font-bold rounded-lg p-4 hover:bg-accent/10 transition col-span-2" 
                    onClick={() => {
                      if (numpadTarget === 'discount') setDiscount('')
                      else if (numpadTarget === 'customer') setCustomerSearch('')
                      else if (numpadTarget === 'barcode') handleProductSearch('')
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="bg-card-bg border border-border-light rounded-lg p-6 shadow-kasheer">
            {/* Customer Selection */}
            <div className="mb-4 relative">
              <label className="text-sm font-medium text-text-primary">Customer</label>
              <input 
                type="text" 
                className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" 
                value={customerSearch} 
                onChange={e => handleCustomerSearch(e.target.value)}
                placeholder="Search customer by name or phone" 
              />
              
              {/* Customer Search Results */}
              {showCustomerResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-card-bg border border-border-light rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto z-10">
                  {searchResults.map((customer) => (
                    <div
                      key={customer.id}
                      className="p-2 hover:bg-secondary-bg cursor-pointer border-b border-border-light last:border-b-0"
                      onClick={() => selectCustomer(customer)}
                    >
                      <p className="font-medium text-text-primary">{customer.name}</p>
                      <p className="text-sm text-text-secondary">{customer.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discount */}
            <div className="mb-4">
              <label className="text-sm font-medium text-text-primary">Discount (%)</label>
              <input 
                type="number" 
                className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" 
                value={discount} 
                onChange={e => setDiscount(e.target.value)}
                placeholder="0" 
                min="0"
                max="100"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Cart</h2>
              <ShoppingCart className="h-5 w-5 text-text-muted" />
            </div>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
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
                    <button 
                      className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
                      onClick={() => decreaseQty(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-text-primary">{item.qty}</span>
                    <button 
                      className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
                      onClick={() => increaseQty(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 rounded bg-gray-100 dark:bg-gray-800 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="space-y-3 border-t border-border-light pt-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text-primary">${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Discount ({discount}%)</span>
                  <span className="font-medium text-red-600">-${totals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax ({settings?.tax_rate || 0}%)</span>
                <span className="font-medium text-text-primary">${totals.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-text-primary">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 mb-4">
              <label className="text-sm font-medium text-text-primary mb-2 block">Payment Method</label>
              <select 
                value={paymentMethod} 
                onChange={e => setPaymentMethod(e.target.value as any)}
                className="w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mobile_payment">Mobile Payment</option>
              </select>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3 mt-6">
              <button 
                className="w-full bg-accent text-white py-3 rounded-md font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={processPayment}
                disabled={processing || cart.length === 0}
              >
                {processing ? 'Processing...' : 'Process Payment'}
              </button>
              <button className="w-full bg-secondary-bg text-text-primary py-3 rounded-md font-medium hover:bg-red-100 hover:text-red-600 transition-colors">
                Hold Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS