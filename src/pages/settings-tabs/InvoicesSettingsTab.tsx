import React, { useState, useRef, useEffect } from 'react';
import { Lock, Info } from 'lucide-react';

const templates = [
  {
    key: 'classic',
    name: 'Classic',
    desc: 'A classic thermal receipt with store logo, clear data, and dotted borders. Ideal for small thermal printers.',
    svg: (
      <svg viewBox="0 0 80 100" className="w-24 h-32" fill="none">
        <rect x="5" y="5" width="70" height="90" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
        <rect x="15" y="15" width="50" height="8" rx="2" fill="#e0e7ef" />
        <rect x="15" y="30" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="40" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="50" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="70" width="50" height="10" rx="2" fill="#a5b4fc" />
      </svg>
    ),
    file: '/invoice_templete_1.html',
  },
  {
    key: 'minimal',
    name: 'Minimal',
    desc: 'A minimal thermal receipt without logo, focusing on clear and simple invoice data.',
    svg: (
      <svg viewBox="0 0 80 100" className="w-24 h-32" fill="none">
        <rect x="5" y="5" width="70" height="90" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
        <rect x="15" y="15" width="50" height="8" rx="2" fill="#e0e7ef" />
        <rect x="15" y="35" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="55" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="75" width="50" height="10" rx="2" fill="#fca5a5" />
      </svg>
    ),
    file: '/invoice_templete_2.html',
  },
  {
    key: 'modern',
    name: 'Modern (Branch)',
    desc: 'A modern receipt showing store name and branch address, supports discounts, and highlights branch info.',
    svg: (
      <svg viewBox="0 0 80 100" className="w-24 h-32" fill="none">
        <rect x="5" y="5" width="70" height="90" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
        <rect x="15" y="15" width="50" height="8" rx="2" fill="#fcd34d" />
        <rect x="15" y="30" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="40" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="50" width="50" height="6" rx="2" fill="#e0e7ef" />
        <rect x="15" y="70" width="50" height="10" rx="2" fill="#fcd34d" />
      </svg>
    ),
    file: '/invoice_templete_3.html',
  },
];

const InvoicesSettingsTab: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  const selected = templates.find(t => t.key === selectedTemplate) || templates[0];
  const settingsRef = useRef<HTMLDivElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const [settingsHeight, setSettingsHeight] = useState<number | undefined>(undefined);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(783); // 48*16+15 تقريباً

  useEffect(() => {
    if (!saveBtnRef.current) return;
    const updateHeight = () => {
      const rect = saveBtnRef.current?.getBoundingClientRect();
      if (rect && settingsRef.current) {
        // احسب المسافة من أعلى الكارت حتى نهاية زر الحفظ
        const cardTop = settingsRef.current.getBoundingClientRect().top;
        setSettingsHeight(rect.bottom - cardTop + 10);
      }
    };
    updateHeight();
    const observer = new (window as any).ResizeObserver(updateHeight);
    if (settingsRef.current) observer.observe(settingsRef.current);
    if (saveBtnRef.current) observer.observe(saveBtnRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (typeof event.data === 'object' && event.data.type === 'set-iframe-height' && typeof event.data.height === 'number') {
        setIframeHeight(Math.max(event.data.height + 15, 783));
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="md:flex md:gap-6 grid grid-cols-1 md:grid-cols-2">
      {/* Card 1: Settings */}
      <div ref={settingsRef} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 md:flex-1" style={settingsHeight ? { minHeight: settingsHeight } : {}}>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Settings</h3>
        {/* Templates Thumbnails */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Invoice Template</label>
          <div className="flex gap-4 mb-4 flex-wrap">
            {templates.map(t => (
              <div key={t.key} className="relative flex flex-col items-center w-28">
                <button
                  type="button"
                  className={`flex flex-col items-center border-2 rounded-lg p-2 transition-all bg-background shadow-sm focus:outline-none w-full h-full
                    ${selectedTemplate === t.key ? 'border-accent ring-2 ring-accent' : 'border-border hover:border-accent/60'}`}
                  onClick={() => setSelectedTemplate(t.key)}
                  tabIndex={0}
                  aria-label={`Select ${t.name} template`}
                  onMouseEnter={() => setHovered(t.key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {t.svg}
                  <span className="text-xs font-medium text-text-primary mt-1">{t.name}</span>
                </button>
                {/* Tooltip/Description */}
                {hovered === t.key && (
                  <div className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-card/80 dark:bg-background/80 border border-border rounded-lg shadow-lg p-3 text-xs text-foreground text-center animate-fade-in backdrop-blur-md">
                    <Info className="inline w-4 h-4 mr-1 text-accent align-text-bottom" />
                    {t.desc}
                  </div>
                )}
              </div>
            ))}
            {/* Custom template (locked) */}
            <div className="relative flex flex-col items-center w-28">
              <button
                type="button"
                className="flex flex-col items-center border-2 rounded-lg p-2 bg-muted shadow-sm border-border opacity-60 cursor-not-allowed relative w-full h-full"
                tabIndex={-1}
                aria-label="Custom template (locked)"
                disabled
                onMouseEnter={() => setHovered('custom')}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="w-24 h-32 bg-white rounded mb-1 border border-muted flex items-center justify-center relative">
                  <Lock className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="text-xs font-medium text-text-primary mt-1">Custom</span>
              </button>
              {hovered === 'custom' && (
                <div className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-card/80 dark:bg-background/80 border border-border rounded-lg shadow-lg p-3 text-xs text-foreground text-center animate-fade-in backdrop-blur-md">
                  <Info className="inline w-4 h-4 mr-1 text-accent align-text-bottom" />
                  Coming soon: You will be able to fully customize your invoice design.
                </div>
              )}
            </div>
          </div>
        </div>
        <form className="space-y-6">
          <div className="pt-2">
            <button ref={saveBtnRef} type="submit" className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors">Save</button>
          </div>
        </form>
      </div>
      {/* Card 2: Preview */}
      <div
        className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 items-center justify-center md:flex-1"
        style={settingsHeight ? { minHeight: settingsHeight } : { minHeight: 340 }}
      >
        <h3 className="text-lg font-semibold text-text-primary mb-2">Preview</h3>
        <div className="w-[220px] bg-background border border-dashed border-accent rounded-lg p-2 flex flex-col items-center justify-center text-muted-foreground">
          <iframe
            ref={iframeRef}
            src={selected.file}
            title="Invoice Preview"
            className="w-[220px] bg-white rounded border border-muted"
            style={{ pointerEvents: 'none', height: iframeHeight }}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoicesSettingsTab; 