import React from 'react'
import { Globe, Moon, Sun } from 'lucide-react'

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Configure your store, preferences, and account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Store Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Store Name</label>
              <input type="text" className="mt-1 block w-full border border-input rounded-md bg-background text-foreground px-3 py-2" placeholder="Store Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Currency</label>
              <input type="text" className="mt-1 block w-full border border-input rounded-md bg-background text-foreground px-3 py-2" placeholder="Currency" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Timezone</label>
              <input type="text" className="mt-1 block w-full border border-input rounded-md bg-background text-foreground px-3 py-2" placeholder="Timezone" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Save</button>
          </form>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preferences</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Theme</label>
              <div className="flex items-center space-x-4 mt-1">
                <button type="button" className="flex items-center space-x-2 px-3 py-2 border border-input rounded-md hover:bg-muted">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </button>
                <button type="button" className="flex items-center space-x-2 px-3 py-2 border border-input rounded-md hover:bg-muted">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </button>
                <button type="button" className="flex items-center space-x-2 px-3 py-2 border border-input rounded-md hover:bg-muted">
                  <Globe className="h-4 w-4" />
                  <span>Auto</span>
                </button>
              </div>
            </div>
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Save</button>
          </form>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Name</label>
            <input type="text" className="mt-1 block w-full border border-input rounded-md bg-background text-foreground px-3 py-2" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Email</label>
            <input type="email" className="mt-1 block w-full border border-input rounded-md bg-background text-foreground px-3 py-2" placeholder="Your Email" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Update</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage 