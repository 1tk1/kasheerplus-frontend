import React from 'react'
import { Shield, Users, Settings, BarChart3 } from 'lucide-react'

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, system settings, and monitor platform statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">User Management</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              <Users className="h-4 w-4" />
              <span>Manage Users</span>
            </button>
            <button className="w-full flex items-center space-x-2 bg-muted text-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors">
              <Shield className="h-4 w-4" />
              <span>Roles & Permissions</span>
            </button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">System Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-2 bg-muted text-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors">
              <Settings className="h-4 w-4" />
              <span>System Configuration</span>
            </button>
            <button className="w-full flex items-center space-x-2 bg-muted text-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Platform Statistics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel 