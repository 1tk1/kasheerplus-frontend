import React from 'react'
import { Plus, Search, Filter } from 'lucide-react'

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and stock levels
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors text-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">SKU</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-md"></div>
                      <div>
                        <p className="font-medium text-foreground">Product {item}</p>
                        <p className="text-sm text-muted-foreground">Description</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-sm text-foreground">SKU{item.toString().padStart(3, '0')}</td>
                  <td className="p-4 align-middle text-sm text-foreground">Category {item}</td>
                  <td className="p-4 align-middle text-sm text-foreground">{25 - item * 3}</td>
                  <td className="p-4 align-middle text-sm text-foreground">${(19.99 + item).toFixed(2)}</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <button className="text-sm text-primary hover:text-primary/80">Edit</button>
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