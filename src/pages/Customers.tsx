import React from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ahmed Ali', email: 'ahmed.ali@example.com', phone: '+20 100 123 4567', orders: 5, total: 250 },
    { id: 2, name: 'Sara Youssef', email: 'sara.youssef@example.com', phone: '+20 101 987 6543', orders: 2, total: 120 },
    { id: 3, name: 'Mohamed Samir', email: 'mohamed.samir@example.com', phone: '+20 102 555 8888', orders: 8, total: 600 },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', image: null as File | null })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target as any
    if (type === 'file') {
      setForm(f => ({ ...f, image: files[0] }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }
  const openAddModal = () => {
    setForm({ name: '', email: '', phone: '', image: null })
    setShowAddModal(true)
  }
  const openEditModal = (idx: number) => {
    const c = customers[idx]
    setEditIndex(idx)
    setForm({ name: c.name, email: c.email, phone: c.phone, image: null })
    setShowEditModal(true)
  }
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomers(prev => [
      ...prev,
      { id: Date.now(), name: form.name, email: form.email, phone: form.phone, orders: 0, total: 0, image: form.image }
    ])
    setShowAddModal(false)
  }
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editIndex !== null) {
      setCustomers(prev => prev.map((c, i) => i === editIndex ? { ...c, name: form.name, email: form.email, phone: form.phone } : c))
      setShowEditModal(false)
    }
  }
  const confirmDeleteCustomer = (idx: number) => {
    setDeleteIndex(idx)
    setShowDeleteModal(true)
  }
  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setCustomers(prev => prev.filter((_, i) => i !== deleteIndex))
      setShowDeleteModal(false)
      setDeleteIndex(null)
    }
  }
  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setDeleteIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database and relationships
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition-colors" onClick={openAddModal}>
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Email</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={c.id} className="border-b border-border-color transition-colors hover:bg-primary-hover">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{c.email}</td>
                  <td className="py-3 px-4 text-sm">{c.phone}</td>
                  <td className="py-3 px-4 text-sm">{c.orders}</td>
                  <td className="py-3 px-4 text-sm">${c.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-accent hover:text-accent-hover p-1 rounded" onClick={() => openEditModal(idx)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-600 p-1 rounded" onClick={() => confirmDeleteCustomer(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Add Customer</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email (optional)</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">Add Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowEditModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Edit Customer</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
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
            <h2 className="text-xl font-bold mb-4 text-text-primary">Delete Customer</h2>
            <p className="mb-6 text-text-secondary">Are you sure you want to delete this customer? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={handleConfirmDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">Yes, Delete</button>
              <button onClick={handleCancelDelete} className="flex-1 bg-secondary-bg text-text-primary py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers 