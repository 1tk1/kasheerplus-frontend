import React from 'react';

const AdvancedSettingsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <button className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors">Export All Settings & Data</button>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
        <button className="bg-destructive text-white px-6 py-2 rounded font-semibold hover:bg-destructive/80 transition-colors">Delete Store</button>
      </div>
      <div>
        <button className="bg-muted text-foreground px-6 py-2 rounded font-semibold border border-border hover:bg-muted/80 transition-colors">Reset All Settings</button>
      </div>
    </div>
  );
};

export default AdvancedSettingsTab; 