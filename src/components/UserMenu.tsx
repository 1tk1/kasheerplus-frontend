import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Settings as Cog, User, ChevronDown } from 'lucide-react';

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="flex items-center space-x-2 p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-muted transition" onClick={() => {/* go to settings */ setOpen(false); }}>
                <Cog className="w-4 h-4" /> Settings
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-muted transition text-red-600" onClick={() => {/* logout */ setOpen(false); }}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 