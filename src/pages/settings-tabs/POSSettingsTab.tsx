import React, { useState } from 'react';
import { Edit, Zap } from 'lucide-react';

const defaultShortcuts = [
  { key: 'Alt+1', action: 'Open New Sale', button: 'Open Sale', disabled: false },
  { key: 'Alt+2', action: 'Open Returns', button: 'Open Returns', disabled: false },
  { key: 'Alt+3', action: 'Print Last Receipt', button: 'Print Last Receipt', disabled: false },
  { key: 'Alt+4', action: 'Close Cashier', button: 'Close Cashier', disabled: false },
  { key: 'Alt+5', action: 'Quick Add Item', button: 'Quick Add Item', disabled: false },
  { key: 'Alt+6', action: 'Cancel Sale', button: 'Cancel Sale', disabled: false },
  { key: 'Alt+7', action: 'Cash Payment', button: 'Cash Payment', disabled: false },
  { key: 'Alt+8', action: 'Card Payment', button: 'Card Payment', disabled: false },
  { key: 'Alt+9', action: 'Open Settings', button: 'Open Settings', disabled: false },
];

const RETURN_PERIOD_DAYS = 14;

const ReturnsPopup: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [barcode, setBarcode] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(''); // yyyy-mm-dd
  const [error] = useState('');
  const [success] = useState(false);

  // دالة وهمية: في التطبيق الحقيقي يجب جلب تاريخ الفاتورة من قاعدة البيانات
  const canReturn = () => {
    if (!invoiceDate) return false;
    const now = new Date();
    const invDate = new Date(invoiceDate);
    const diff = (now.getTime() - invDate.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= RETURN_PERIOD_DAYS;
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-6 text-text-primary">Return Item</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Invoice Number</label>
            <input type="text" className="w-full border border-input rounded-md px-4 py-2 bg-background text-text-primary" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Item Barcode</label>
            <input type="text" className="w-full border border-input rounded-md px-4 py-2 bg-background text-text-primary" value={barcode} onChange={e => setBarcode(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Invoice Date</label>
            <input type="date" className="w-full border border-input rounded-md px-4 py-2 bg-background text-text-primary" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
          </div>
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          {success && <div className="text-green-600 text-sm font-medium">Ready to process return.</div>}
          <button
            className={`w-full px-6 py-2 rounded font-semibold transition-colors ${canReturn() ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-100 text-red-600 cursor-not-allowed'}`}
            disabled={!canReturn()}
            onClick={() => {}}
          >
            Process Return
          </button>
        </div>
      </div>
    </div>
  );
};

const POSSettingsTab: React.FC = () => {
  const [shortcuts] = useState(defaultShortcuts);

  return (
    <div className="max-w-2xl mx-auto">
      <ReturnsPopup open={false} onClose={() => {}} />
      <div className="bg-card border border-border rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-accent" />
          <h3 className="text-xl font-bold text-text-primary">POS Shortcuts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className={
                "card p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-kasheer-lg hover:scale-105 " +
                (s.disabled ? 'opacity-40 pointer-events-none' : '')
              }
              onClick={() => {
                if (s.action === 'Open Returns') {
                  // The ReturnsPopup component handles its own state and logic
                }
                // يمكنك إضافة منطق آخر لكل اختصار هنا
              }}
              title={s.key}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 " style={{ background: s.disabled ? '#e5e7eb' : '#e0f2fe' }}>
                <Zap className={"w-6 h-6 " + (s.disabled ? 'text-muted-foreground' : 'text-accent')} />
              </div>
              <div className="text-base font-semibold text-text-primary mb-1">{s.button}</div>
              <div className="text-xs font-mono text-accent bg-muted rounded px-2 py-1 mt-1">{s.key}</div>
              <button
                className="mt-3 text-xs bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover transition-colors flex items-center gap-1"
                type="button"
                onClick={e => { e.stopPropagation(); }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default POSSettingsTab; 