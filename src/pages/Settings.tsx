import React, { useState } from 'react';
import { Store, Users, FileText, Monitor, Plug, Settings as Cog } from 'lucide-react';
import StoreSettingsTab from './settings-tabs/StoreSettingsTab';
import UsersSettingsTab from './settings-tabs/UsersSettingsTab';
import InvoicesSettingsTab from './settings-tabs/InvoicesSettingsTab';
import POSSettingsTab from './settings-tabs/POSSettingsTab';
import IntegrationsSettingsTab from './settings-tabs/IntegrationsSettingsTab';
import PrivacySettingsTab from './settings-tabs/PrivacySettingsTab';

const tabs = [
  { key: 'store', label: 'Store', icon: Store },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'pos', label: 'POS', icon: Monitor },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'privacy', label: 'Privacy', icon: Cog },
];

const tabComponents: Record<string, React.FC> = {
  store: StoreSettingsTab,
  users: UsersSettingsTab,
  invoices: InvoicesSettingsTab,
  pos: POSSettingsTab,
  integrations: IntegrationsSettingsTab,
  privacy: PrivacySettingsTab,
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('store');
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <main className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your store, users, invoices, and more.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-accent text-white px-4 py-2 rounded-md font-semibold hover:bg-accent-hover transition-colors">Save Changes</button>
          <button className="bg-muted text-foreground px-4 py-2 rounded-md font-semibold border border-border hover:bg-muted/80 transition-colors">Reset to Defaults</button>
        </div>
      </div>
      {/* Tabs */}
      <nav className="overflow-x-auto">
        <ul className="flex gap-2 border-b border-border pb-1">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium text-sm focus:outline-none transition-colors
                  ${activeTab === tab.key ? 'border-b-2 border-b-primary text-primary bg-transparent' : 'text-muted-foreground bg-transparent hover:text-primary'}`}
                onClick={() => setActiveTab(tab.key)}
                aria-current={activeTab === tab.key ? 'page' : undefined}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Tab Content */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 shadow-md">
          <ActiveTabComponent />
        </div>
      </section>
    </main>
  );
};

export default Settings; 