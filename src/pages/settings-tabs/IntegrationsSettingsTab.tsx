import React from 'react';

const IntegrationsSettingsTab: React.FC = () => {
  return (
    <>
      <div className="space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full h-full backdrop-blur-2xl bg-gradient-to-br from-background/80 to-accent/10 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-12 h-12 text-accent mb-2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="text-3xl font-bold text-accent drop-shadow-lg">Coming Soon</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xl space-y-6 opacity-60 select-none pointer-events-none relative z-0 mx-auto">
          <div>
            <label className="text-sm font-medium text-text-primary">Email Provider</label>
            <select className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent">
              <option>SMTP</option>
              <option>SendGrid</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">API Key</label>
            <div className="flex gap-2 mt-1">
              <input type="text" className="w-full rounded border border-input bg-background px-3 py-2 text-text-primary" value="sk-1234567890" readOnly />
              <button className="bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover">Copy</button>
              <button className="bg-muted text-foreground px-3 py-1 rounded border border-border hover:bg-muted/80">Regenerate</button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">Webhooks</label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center gap-2">
                <input type="text" className="w-full rounded border border-input bg-background px-3 py-2 text-text-primary" value="https://example.com/webhook" readOnly />
                <button className="bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover">Edit</button>
                <button className="bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/80">Delete</button>
              </div>
              <button className="bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">+ Add Webhook</button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary">Third-Party Integrations</label>
            <div className="flex gap-4 mt-2">
              <button className="bg-muted text-foreground px-3 py-1 rounded border border-border hover:bg-muted/80">Connect Shopify</button>
              <button className="bg-muted text-foreground px-3 py-1 rounded border border-border hover:bg-muted/80">Connect WooCommerce</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationsSettingsTab; 