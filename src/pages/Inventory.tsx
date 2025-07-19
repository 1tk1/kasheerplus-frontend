import React, { useState } from 'react'
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react'

const Inventory: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: '',
    supplier: '',
    sku: '',
    price: '',
    cost: '',
    stock: '',
    threshold: '',
    images: [] as File[]
  })
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categories, setCategories] = useState([
    'Electronics', 'Accessories', 'Audio', 'Clothing', 'Grocery', 'Other'
  ])
  const [newCategory, setNewCategory] = useState('')
  const handleAddCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const cat = newCategory.trim()
    if (cat && !categories.includes(cat)) {
      setCategories([...categories, cat])
      setNewCategory('')
    }
  }

  // Generate barcode automatically when modal opens
  const openModal = () => {
    const random = Array.from({length: 12}, () => Math.floor(Math.random() * 10)).join('')
    setForm({
      name: '',
      category: '',
      supplier: '',
      sku: random,
      price: '',
      cost: '',
      stock: '',
      threshold: '',
      images: []
    })
    setShowModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }))
    } else if (type === 'file') {
      if (files && files.length > 0) {
        setForm(f => ({ ...f, images: [...f.images, ...(Array.from(files) as File[])] }))
      }
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }
  const handleRemoveImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: handle add product logic
    setShowModal(false)
  }

  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Pro', sku: 'LAP001', category: 'Electronics', supplier: 'Alfa Trading', stock: 15, price: 1299.99, cost: 900, threshold: 5, images: [] as File[] },
    { id: 2, name: 'Wireless Mouse', sku: 'MOU002', category: 'Accessories', supplier: 'Global Supplies', stock: 3, price: 29.99, cost: 15, threshold: 2, images: [] as File[] },
    { id: 3, name: 'Gaming Keyboard', sku: 'KEY003', category: 'Electronics', supplier: 'El-Nour Import', stock: 0, price: 89.99, cost: 50, threshold: 1, images: [] as File[] },
    { id: 4, name: 'USB Cable', sku: 'CAB004', category: 'Accessories', supplier: '', stock: 45, price: 12.99, cost: 5, threshold: 10, images: [] as File[] },
    { id: 5, name: 'Monitor 24"', sku: 'MON005', category: 'Electronics', supplier: '', stock: 8, price: 299.99, cost: 200, threshold: 2, images: [] as File[] },
    { id: 6, name: 'Webcam HD', sku: 'CAM006', category: 'Electronics', supplier: '', stock: 2, price: 59.99, cost: 30, threshold: 1, images: [] as File[] },
    { id: 7, name: 'Headphones', sku: 'AUD007', category: 'Audio', supplier: '', stock: 12, price: 79.99, cost: 40, threshold: 3, images: [] as File[] },
    { id: 8, name: 'Tablet 10"', sku: 'TAB008', category: 'Electronics', supplier: '', stock: 0, price: 399.99, cost: 250, threshold: 1, images: [] as File[] }
  ])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const openEditModal = (idx: number) => {
    setEditIndex(idx)
    const p = products[idx]
    setForm({
      ...p,
      price: p.price.toString(),
      cost: p.cost.toString(),
      stock: p.stock.toString(),
      threshold: p.threshold.toString(),
      images: p.images || []
    })
    setShowEditModal(true)
  }
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editIndex !== null) {
      const updated = [...products]
      updated[editIndex] = {
        ...updated[editIndex],
        ...form,
        price: Number(form.price),
        cost: Number(form.cost),
        stock: Number(form.stock),
        threshold: Number(form.threshold)
      }
      setProducts(updated)
      setShowEditModal(false)
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const confirmDeleteProduct = (idx: number) => {
    setDeleteIndex(idx)
    setShowDeleteModal(true)
  }
  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setProducts(products.filter((_, i) => i !== deleteIndex))
      setShowDeleteModal(false)
      setDeleteIndex(null)
    }
  }
  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setDeleteIndex(null)
  }

  const supplierOptions = ['Alfa Trading', 'Global Supplies', 'El-Nour Import']

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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
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
                  <select name="category" value={form.category} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required>
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-2">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
                    <select name="supplier" value={form.supplier || ''} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                      <option value="">Select supplier</option>
                      {supplierOptions.map(sup => (
                        <option key={sup} value={sup}>{sup}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Barcode</label>
                    <input type="text" name="sku" value={form.sku} readOnly className="w-full border border-border-light rounded-md px-4 py-2 bg-gray-100 dark:bg-gray-800 text-text-muted cursor-not-allowed placeholder-text-muted focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cost Price</label>
                  <input type="number" name="cost" value={form.cost} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Selling Price</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Quantity</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Threshold</label>
                  <input type="number" name="threshold" value={form.threshold} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1">Product Images</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <label htmlFor="product-image-upload" className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-accent bg-primary-bg cursor-pointer hover:bg-accent/10 transition-colors overflow-hidden">
                      <img src="/the plus icon.png" alt="plus" className="w-12 h-12 object-contain text-accent rotate-45 dark:hidden" style={{ marginRight: '3px' }} />
                      <img src="/the plus white for dark mode.png" alt="plus-dark" className="w-12 h-12 object-contain rotate-45 hidden dark:block" style={{ marginRight: '3px' }} />
                      <input id="product-image-upload" type="file" name="images" accept="image/*" multiple onChange={handleChange} className="hidden" />
                    </label>
                    {form.images && form.images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent">
                        <img src={URL.createObjectURL(img)} alt={`Preview ${idx+1}`} className="w-full h-full object-cover rounded-full" />
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full shadow p-1 hover:bg-red-100" style={{ fontSize: '0.8rem', lineHeight: 1 }} title="Remove image">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">Add Product</button>
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
              {categories.map((cat, idx) => (
                <div key={cat} className="px-3 py-2 rounded bg-secondary-bg text-text-primary text-sm flex items-center justify-between">
                  <span>{cat}</span>
                  <button type="button" onClick={() => setCategories(categories.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 ml-2" title="Delete">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
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
                  <select name="category" value={form.category} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required>
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-2">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
                    <select name="supplier" value={form.supplier || ''} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                      <option value="">Select supplier</option>
                      {supplierOptions.map(sup => (
                        <option key={sup} value={sup}>{sup}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Barcode</label>
                    <input type="text" name="sku" value={form.sku} readOnly className="w-full border border-border-light rounded-md px-4 py-2 bg-gray-100 dark:bg-gray-800 text-text-muted cursor-not-allowed placeholder-text-muted focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cost Price</label>
                  <input type="number" name="cost" value={form.cost} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Selling Price</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Quantity</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock Threshold</label>
                  <input type="number" name="threshold" value={form.threshold} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" required />
                </div>
                {/* Images preview (اختياري) */}
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={handleCancelDelete}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-text-primary">Delete Product</h2>
            <p className="mb-6 text-text-secondary">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={handleConfirmDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">Yes, Delete</button>
              <button onClick={handleCancelDelete} className="flex-1 bg-secondary-bg text-text-primary py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Cancel</button>
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
              {products.map((item, idx) => {
                let status: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';
                if (item.stock === 0) status = 'out-of-stock';
                else if (item.stock <= (item.threshold || 2)) status = 'low-stock';
                return (
                <tr key={item.id} className="border-b border-border-color transition-colors hover:bg-primary-hover">
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 product-placeholder">
                        <Package className="w-5 h-5 icon" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.name}</p>
                        <p className="text-sm text-text-secondary">Product Description</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-sm text-text-primary">{item.sku}</td>
                  <td className="p-4 align-middle text-sm text-text-primary">{item.category}</td>
                  <td className="p-4 align-middle text-sm text-text-primary">{item.supplier || '—'}</td>
                  <td className="p-4 align-middle text-sm text-text-primary">{item.stock}</td>
                  <td className="p-4 align-middle text-sm text-text-primary">${item.price.toFixed(2)}</td>
                  <td className="p-4 align-middle">
                    {status === 'in-stock' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        In Stock
                      </span>
                    ) : status === 'low-stock' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-accent hover:text-accent-hover transition-colors" onClick={() => openEditModal(idx)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-sm text-red-500 hover:text-red-600 transition-colors" onClick={() => confirmDeleteProduct(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventory 