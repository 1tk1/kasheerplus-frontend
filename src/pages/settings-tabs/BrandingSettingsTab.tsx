import React from 'react';

const BrandingSettingsTab: React.FC = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="text-sm font-medium text-text-primary">Logo Upload</label>
        <div className="flex items-center gap-4 mt-2">
          <div className="w-16 h-16 bg-muted rounded border border-border flex items-center justify-center text-muted-foreground">Logo</div>
          <div className="flex flex-col gap-2">
            <button type="button" className="bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover">Upload</button>
            <button type="button" className="bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/80">Remove</button>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-text-primary">Theme Color</label>
        <input type="color" className="w-12 h-8 rounded border border-input bg-background mt-1" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-text-primary">Dark Mode</label>
        <input type="checkbox" className="accent-accent" />
      </div>
      <div>
        <label className="text-sm font-medium text-text-primary">Favicon Upload</label>
        <div className="flex items-center gap-4 mt-2">
          <div className="w-10 h-10 bg-muted rounded border border-border flex items-center justify-center text-muted-foreground">Icon</div>
          <div className="flex flex-col gap-2">
            <button type="button" className="bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover">Upload</button>
            <button type="button" className="bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/80">Remove</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BrandingSettingsTab; 