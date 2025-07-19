import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

const Invoices: React.FC = () => {
  const [isSupplierMode, setIsSupplierMode] = useState(false)
  const [customerInvoices, setCustomerInvoices] = useState([
    { id: 1, invoiceNumber: 'INV-0001', customer: 'Ahmed Ali', supplier: '', date: '2024-01-01', amount: 250, status: 'Paid' },
    { id: 2, invoiceNumber: 'INV-0002', customer: 'Sara Youssef', supplier: '', date: '2024-01-05', amount: 120, status: 'Unpaid' },
    { id: 3, invoiceNumber: 'INV-0003', customer: 'Mohamed Samir', supplier: '', date: '2024-01-10', amount: 600, status: 'Paid' },
  ])
  const [supplierInvoices, setSupplierInvoices] = useState([
    { id: 1, invoiceNumber: 'SUP-0001', customer: '', supplier: 'Alfa Trading', date: '2024-01-02', amount: 400, status: 'Paid' },
    { id: 2, invoiceNumber: 'SUP-0002', customer: '', supplier: 'Global Supplies', date: '2024-01-07', amount: 220, status: 'Unpaid' },
    { id: 3, invoiceNumber: 'SUP-0003', customer: '', supplier: 'El-Nour Import', date: '2024-01-12', amount: 900, status: 'Paid' },
  ])
  const invoices = isSupplierMode ? supplierInvoices : customerInvoices
  const setInvoices = isSupplierMode ? setSupplierInvoices : setCustomerInvoices
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ invoiceNumber: '', customer: '', supplier: '', date: '', amount: '', status: 'Paid' })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }
  const openAddModal = () => {
    setForm({ invoiceNumber: '', customer: '', supplier: '', date: '', amount: '', status: 'Paid' })
    setShowAddModal(true)
  }
  const openEditModal = (idx: number) => {
    const inv = invoices[idx]
    setEditIndex(idx)
    setForm({ invoiceNumber: inv.invoiceNumber, customer: inv.customer, supplier: inv.supplier, date: inv.date, amount: inv.amount.toString(), status: inv.status })
    setShowEditModal(true)
  }
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInvoices(prev => [
      ...prev,
      { id: Date.now(), invoiceNumber: form.invoiceNumber, customer: isSupplierMode ? '' : form.customer, supplier: isSupplierMode ? form.supplier : '', date: form.date, amount: Number(form.amount), status: form.status }
    ])
    setShowAddModal(false)
  }
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editIndex !== null) {
      setInvoices(prev => prev.map((inv, i) => i === editIndex ? { ...inv, invoiceNumber: form.invoiceNumber, customer: isSupplierMode ? '' : form.customer, supplier: isSupplierMode ? form.supplier : '', date: form.date, amount: Number(form.amount), status: form.status } : inv))
      setShowEditModal(false)
    }
  }
  const confirmDeleteInvoice = (idx: number) => {
    setDeleteIndex(idx)
    setShowDeleteModal(true)
  }
  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setInvoices(prev => prev.filter((_, i) => i !== deleteIndex))
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
          <h1 className="text-3xl font-bold text-foreground">{isSupplierMode ? 'Supplier Invoices' : 'Invoices'}</h1>
          <p className="text-muted-foreground">
            {isSupplierMode ? 'Manage supplier invoices and billing' : 'Manage invoices and billing'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center space-x-2 bg-secondary-bg text-accent px-4 py-2 rounded-md border border-accent hover:bg-accent/10 transition-colors" onClick={() => setIsSupplierMode(m => !m)}>
            <span>{isSupplierMode ? 'Show Customer Invoices' : 'Show Supplier Invoices'}</span>
          </button>
          <button className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition-colors" onClick={openAddModal}>
            <Plus className="h-4 w-4" />
            <span>{isSupplierMode ? 'Create Supplier Invoice' : 'Create Invoice'}</span>
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Invoice #</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">{isSupplierMode ? 'Supplier' : 'Customer'}</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Date</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={inv.id} className="border-b border-border-color transition-colors hover:bg-primary-hover">
                  <td className="py-3 px-4 font-medium">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 text-sm">{isSupplierMode ? inv.supplier : inv.customer}</td>
                  <td className="py-3 px-4 text-sm">{inv.date}</td>
                  <td className="py-3 px-4 text-sm">${inv.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${inv.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2 items-center">
                    <button onClick={() => openEditModal(idx)} className="text-accent hover:text-accent-hover p-2 rounded-full transition-colors" title="Edit">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => { setDeleteIndex(idx); setShowDeleteModal(true); }} className="text-red-500 hover:text-red-600 p-2 rounded-full transition-colors" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => { console.log('Print invoice', inv); }} className="text-gray-500 hover:text-accent p-2 rounded-full transition-colors" title="Print">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5M6 18H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2h-1m-10 0v2a1 1 0 001 1h6a1 1 0 001-1v-2m-8 0h8" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">{isSupplierMode ? 'Add Supplier Invoice' : 'Add Invoice'}</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Invoice Number</label>
                <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">{isSupplierMode ? 'Supplier' : 'Customer'}</label>
                <input type="text" name={isSupplierMode ? 'supplier' : 'customer'} value={isSupplierMode ? (form as any).supplier || '' : form.customer} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Amount</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" min="0" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">{isSupplierMode ? 'Add Supplier Invoice' : 'Add Invoice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowEditModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">{isSupplierMode ? 'Edit Supplier Invoice' : 'Edit Invoice'}</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Invoice Number</label>
                <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus-border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">{isSupplierMode ? 'Supplier' : 'Customer'}</label>
                <input type="text" name={isSupplierMode ? 'supplier' : 'customer'} value={isSupplierMode ? (form as any).supplier || '' : form.customer} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus-border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus-border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Amount</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus-border-transparent" min="0" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-border-light rounded-md px-4 py-2 bg-card-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus-border-transparent">
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors">{isSupplierMode ? 'Save Supplier Invoice' : 'Save Changes'}</button>
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
            <h2 className="text-xl font-bold mb-4 text-text-primary">Delete Invoice</h2>
            <p className="mb-6 text-text-secondary">Are you sure you want to delete this invoice? This action cannot be undone.</p>
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

export default Invoices 