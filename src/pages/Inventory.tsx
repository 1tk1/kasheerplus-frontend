import React, { useState } from 'react'
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { useSuppliers } from '@/hooks/useSuppliers'
import toast from 'react-hot-toast'

const Inventory: React.FC = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()
  const { categories, addCategory } = useCategories()
  const { suppliers } = useSuppliers()
  
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [deletingProduct, setDeleteingProduct] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState('')
  
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    supplier_id: '',
    sku: '',
    barcode: '',
    cost_price: '',
    selling_price: '',
    stock_quantity: '',
    min_stock_threshold: '',
    description: ''
  })

  // Generate barcode automatically when modal opens
  const openModal = () => {
    const random = Array.from({length: 12}, () => Math.floor(Math.random() * 10)).join('')
    setForm({
      name: '',
      category_id: '',
      supplier_id: '',
      sku: random,
      barcode: random,
      cost_price: '',
      selling_price: '',
      stock_quantity: '',
      min_stock_threshold: '',
      description: ''
    })
    setShowModal(true)
  }

  const openEditModal = (product: any) => {
    setEditingProduct(product.id)
    setForm({
      name: product.name,
      category_id: product.category_id || '',
      supplier_id: product.supplier_id || '',
      sku: product.sku,
      barcode: product.barcode || '',
      cost_price: product.cost_price.toString(),
      selling_price: product.selling_price.toString(),
      stock_quantity: product.stock_quantity.toString(),
      min_stock_threshold: product.min_stock_threshold.toString(),
      description: product.description || ''
    })
    setShowEditModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await addProduct({
        name: form.name,
        category_id: form.category_id || null,
        supplier_id: form.supplier_id || null,
        sku: form.sku,
        barcode: form.barcode || null,
        cost_price: parseFloat(form.cost_price) || 0,
        selling_price: parseFloat(form.selling_price),
        stock_quantity: parseInt(form.stock_quantity) || 0,
        min_stock_threshold: parseInt(form.min_stock_threshold) || 0,
        description: form.description || null
      })
      
      toast.success('Product added successfully!')
      setShowModal(false)
    } catch (error) {
      toast.error('Failed to add product')
      console.error(error)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return
    
    try {
      await updateProduct(editingProduct, {
        name: form.name,
        category_id: form.category_id || null,
        supplier_id: form.supplier_id || null,
        sku: form.sku,
        barcode: form.barcode || null,
        cost_price: parseFloat(form.cost_price) || 0,
        selling_price: parseFloat(form.selling_price),
        stock_quantity: parseInt(form.stock_quantity) || 0,
        min_stock_threshold: parseInt(form.min_stock_threshold) || 0,
        description: form.description || null
      })
      
      toast.success('Product updated successfully!')
      setShowEditModal(false)
      setEditingProduct(null)
    } catch (error) {
      toast.error('Failed to update product')
      console.error(error)
    }
  }

  const handleAddCategory = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    const cat = newCategory.trim()
    if (!cat) return
    
    try {
      await addCategory(cat)
      setNewCategory('')
      toast.success('Category added successfully!')
    } catch (error) {
      toast.error('Failed to add category')
      console.error(error)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    
    try {
      await deleteProduct(deletingProduct)
      toast.success('Product deleted successfully!')
      setShowDeleteModal(false)
      setDeleteingProduct(null)
    } catch (error) {
      toast.error('Failed to delete product')
      console.error(error)
    }
  }

  const getStockStatus = (product: any) => {
    if (product.stock_quantity === 0) return 'out-of-stock'
    if (product.stock_quantity <= product.min_stock_threshold) return 'low-stock'
    return 'in-stock'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock'
      case 'low-stock': return 'Low Stock'
      case 'out-of-stock': return 'Out of Stock'
      default: return 'Unknown'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Inventory</h1>
          <p className="text-text-secondary">
            Manage your product inventory and stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center space-x-2 bg-secondary-bg text-accent px-4 py-2 rounded-md border border-accent hover:bg-accent/10 transition-colors"
            onClick={() => setShowCategoryModal(true)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span>Manage Categories</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition-colors"
            onClick={openModal}
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Product Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
                  <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
                  <select name="supplier_id" value={form.supplier_id} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                    <option value="">Select supplier</option>
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">SKU</label>
                  <input type="text" name="sku" value={form.sku} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Barcode</label>
                  <input type="text" name="barcode" value={form.barcode} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cost Price</label>
                  <input type="number" name="cost_price" value={form.cost_price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Selling Price</label>
                  <input type="number" name="selling_price" value={form.selling_price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Quantity</label>
                  <input type="number" name="stock_quantity" value={form.stock_quantity} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Min Stock Threshold</label>
                  <input type="number" name="min_stock_threshold" value={form.min_stock_threshold} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" rows={3} />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowEditModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Product Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
                  <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
                  <select name="supplier_id" value={form.supplier_id} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                    <option value="">Select supplier</option>
                    {suppliers.map(sup => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">SKU</label>
                  <input type="text" name="sku" value={form.sku} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Barcode</label>
                  <input type="text" name="barcode" value={form.barcode} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cost Price</label>
                  <input type="number" name="cost_price" value={form.cost_price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Selling Price</label>
                  <input type="number" name="selling_price" value={form.selling_price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Quantity</label>
                  <input type="number" name="stock_quantity" value={form.stock_quantity} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Min Stock Threshold</label>
                  <input type="number" name="min_stock_threshold" value={form.min_stock_threshold} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" rows={3} />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowCategoryModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-text-primary">Manage Categories</h2>
            <form onSubmit={handleAddCategory} className="flex mb-4 gap-2">
              <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="Add new category..." />
              <button type="submit" className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">Add</button>
            </form>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat.id} className="px-3 py-2 rounded bg-secondary-bg text-text-primary text-sm flex items-center justify-between">
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowDeleteModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-text-primary">Delete Product</h2>
            <p className="mb-6 text-text-secondary">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-secondary-bg text-text-primary py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-secondary-bg border border-border-color rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-border-color rounded-md hover:bg-primary-hover transition-colors text-text-primary">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Product</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">SKU</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Supplier</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Stock</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                const status = getStockStatus(item)
                return (
                  <tr key={item.id} className="border-b border-border-color transition-colors hover:bg-primary-hover">
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 product-placeholder">
                          <Package className="w-5 h-5 icon" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{item.name}</p>
                          <p className="text-sm text-text-secondary">{item.description || 'No description'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-sm text-text-primary">{item.sku}</td>
                    <td className="p-4 align-middle text-sm text-text-primary">{item.categories?.name || '—'}</td>
                    <td className="p-4 align-middle text-sm text-text-primary">{item.suppliers?.name || '—'}</td>
                    <td className="p-4 align-middle text-sm text-text-primary">{item.stock_quantity}</td>
                    <td className="p-4 align-middle text-sm text-text-primary">${item.selling_price.toFixed(2)}</td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-sm text-accent hover:text-accent-hover transition-colors" 
                          onClick={() => openEditModal(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-sm text-red-500 hover:text-red-600 transition-colors" 
                          onClick={() => {
                            setDeleteingProduct(item.id)
                            setShowDeleteModal(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventory