import React from 'react'
import { Plus, Search, Filter, Package, Edit, Trash2 } from 'lucide-react'

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Inventory</h1>
          <p className="text-text-secondary">
            Manage your product inventory and stock levels
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-secondary-bg border border-border-color rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-md bg-primary-bg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Stock</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: 'Laptop Pro', sku: 'LAP001', category: 'Electronics', stock: 15, price: 1299.99, status: 'in-stock' },
                { id: 2, name: 'Wireless Mouse', sku: 'MOU002', category: 'Accessories', stock: 3, price: 29.99, status: 'low-stock' },
                { id: 3, name: 'Gaming Keyboard', sku: 'KEY003', category: 'Electronics', stock: 0, price: 89.99, status: 'out-of-stock' },
                { id: 4, name: 'USB Cable', sku: 'CAB004', category: 'Accessories', stock: 45, price: 12.99, status: 'in-stock' },
                { id: 5, name: 'Monitor 24"', sku: 'MON005', category: 'Electronics', stock: 8, price: 299.99, status: 'in-stock' },
                { id: 6, name: 'Webcam HD', sku: 'CAM006', category: 'Electronics', stock: 2, price: 59.99, status: 'low-stock' },
                { id: 7, name: 'Headphones', sku: 'AUD007', category: 'Audio', stock: 12, price: 79.99, status: 'in-stock' },
                { id: 8, name: 'Tablet 10"', sku: 'TAB008', category: 'Electronics', stock: 0, price: 399.99, status: 'out-of-stock' }
              ].map((item) => (
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
                  <td className="p-4 align-middle text-sm text-text-primary">{item.stock}</td>
                  <td className="p-4 align-middle text-sm text-text-primary">${item.price.toFixed(2)}</td>
                  <td className="p-4 align-middle">
                    {item.status === 'in-stock' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        In Stock
                      </span>
                    ) : item.status === 'low-stock' ? (
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
                      <button className="text-sm text-accent hover:text-accent-hover transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
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
    </div>
  )
}

export default Inventory 