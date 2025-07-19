import React from 'react'
import { FileText, Download } from 'lucide-react'

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">
          View and export business analytics and reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sales Report</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">This Month</span>
            <button className="flex items-center space-x-1 text-primary hover:underline">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
          <div className="h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            [Sales Chart Placeholder]
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Inventory Report</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Stock</span>
            <button className="flex items-center space-x-1 text-primary hover:underline">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
          <div className="h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            [Inventory Chart Placeholder]
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Export Options</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button className="flex items-center space-x-2 bg-muted text-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports 