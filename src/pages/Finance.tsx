import React from 'react'
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

const Finance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Finance</h1>
        <p className="text-muted-foreground">
          Track revenue, expenses, and financial performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$125,000</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+12.5%</span>
            <span className="text-sm text-muted-foreground ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">$45,000</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            <span className="text-sm font-medium text-red-600">-5.2%</span>
            <span className="text-sm text-muted-foreground ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-bold text-foreground">$80,000</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">+18.3%</span>
            <span className="text-sm text-muted-foreground ml-1">from last month</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Financial Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <span className="font-medium">Sales Revenue</span>
            <span className="text-green-600 font-medium">$125,000</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <span className="font-medium">Cost of Goods</span>
            <span className="text-red-600 font-medium">-$35,000</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <span className="font-medium">Operating Expenses</span>
            <span className="text-red-600 font-medium">-$10,000</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-md">
            <span className="font-medium">Net Profit</span>
            <span className="text-primary font-bold">$80,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finance 