import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationsMenu: React.FC = () => {
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

  // إشعارات وهمية كمثال
  const notifications = [
    { id: 1, text: 'New order received', time: '2 min ago' },
    { id: 2, text: 'Stock is low for Product X', time: '10 min ago' },
    { id: 3, text: 'User Ahmed joined your team', time: '1 hour ago' },
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="flex items-center p-2 rounded-lg text-primary hover:bg-secondary-bg transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="ml-1 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border font-semibold text-text-primary">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-6 text-center text-muted-foreground">No notifications</li>
            ) : (
              notifications.map(n => (
                <li key={n.id} className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/40 transition">
                  <div className="text-sm text-text-primary">{n.text}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
                </li>
              ))
            )}
          </ul>
          <div className="p-2 text-center">
            <button className="text-accent text-sm font-semibold hover:underline">View all</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu; 