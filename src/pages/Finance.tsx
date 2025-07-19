import React from 'react';
import { useNavigate } from 'react-router-dom';

const financialReports = [
  { slug: 'pnl', title: 'Profit & Loss Statement', description: 'Total revenue (sales + services), cost of goods sold (COGS), gross profit, operating expenses, and net profit after expenses.' },
  { slug: 'cash-flow', title: 'Cash Flow Statement', description: 'Incoming/outgoing funds, net cash flow, and balances.' },
  { slug: 'expenses', title: 'Expenses Report', description: 'Expense details, categories, and attachments.' },
  { slug: 'income', title: 'Income Report', description: 'Income sources and breakdowns.' },
  { slug: 'receivables', title: 'Receivables & Payables', description: 'Outstanding balances for customers and suppliers.' },
  { slug: 'tax', title: 'Tax Report', description: 'Taxable sales, collected tax, and included invoices.' },
  { slug: 'cash-bank', title: 'Cash & Bank Report', description: 'Account balances and transactions.' },
  { slug: 'assets', title: 'Assets & Depreciation', description: 'Assets, depreciation, and current value.' },
];

const Finance: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Financial Reports</h1>
      <p className="text-muted-foreground mb-8">Access and analyze your store’s financial performance and statements.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {financialReports.map((report) => (
          <div
            key={report.slug}
            className="bg-white dark:bg-secondary-bg rounded-xl shadow p-6 flex flex-col justify-between border border-border-color cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/finance/${report.slug}`)}
            tabIndex={0}
            role="button"
            aria-label={`Open ${report.title} details`}
          >
            <h2 className="text-xl font-semibold text-text-primary mb-2">{report.title}</h2>
            <p className="text-text-secondary mb-2 text-sm">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance; 