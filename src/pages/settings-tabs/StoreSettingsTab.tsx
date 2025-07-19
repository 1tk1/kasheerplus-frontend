import React, { useRef, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';

const StoreSettingsTab: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemove = () => setLogo(null);

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Store Name */}
        <div>
          <label className="text-sm font-medium text-text-primary">Store Name</label>
          <input type="text" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="Store Name" />
        </div>
        {/* Logo */}
        <div>
          <label className="text-sm font-medium text-text-primary">Store Logo</label>
          <div className="flex items-center gap-4 mt-1">
            <div className="w-20 h-20 rounded-full bg-muted border-2 border-border shadow flex items-center justify-center overflow-hidden">
              {logo ? (
                <img src={logo} alt="Logo preview" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-8 w-8 text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleUpload}
                />
                <button
                  type="button"
                  className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover focus:ring-2 focus:ring-accent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" /> <span>Upload</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 focus:ring-2 focus:ring-red-200"
                  onClick={handleRemove}
                  disabled={!logo}
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-text-primary">Store Email</label>
          <input type="email" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="Email" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary">Store Phone</label>
          <input type="tel" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="Phone" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-text-primary">Tax Rate (%)</label>
          <input type="number" min="0" max="100" step="0.01" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="e.g. 14" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary">Return Period (days)</label>
          <input type="number" min="0" max="60" step="1" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="e.g. 14" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-text-primary">Store Address</label>
        <input type="text" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" placeholder="Address" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-text-primary">Store Currency</label>
          <select className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent">
            <option>USD</option>
            <option>EGP</option>
            <option>SAR</option>
            <option>AED</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary">Timezone</label>
          <select className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent">
            <option>GMT+2 (Cairo)</option>
            <option>GMT+3 (Riyadh)</option>
            <option>GMT+4 (Dubai)</option>
          </select>
        </div>
      </div>
      <div className="pt-2">
        <button type="submit" className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors">Save</button>
      </div>
    </form>
  );
};

export default StoreSettingsTab; 