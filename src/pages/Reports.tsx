import React from 'react';
import { useNavigate } from 'react-router-dom';

const operationalReports = [
  { slug: 'sales', title: 'Sales Report', description: 'Track all sales invoices and analyze sales performance.' },
  { slug: 'top-products', title: 'Top/Low Selling Products', description: 'See which products sell best and which are slow-moving.' },
  { slug: 'pnl', title: 'Profit & Loss (P&L)', description: 'Monitor gross/net profit, costs, and expenses.' },
  { slug: 'inventory', title: 'Inventory Report', description: 'Monitor stock levels, value, and product status.' },
  { slug: 'returns', title: 'Returned Sales Report', description: 'Analyze returned products and reasons.' },
  { slug: 'shifts', title: 'Cash Register / Shift Report', description: 'Track cash register shifts and balances.' },
  { slug: 'customers', title: 'Customers Report', description: 'Analyze customer activity and value.' },
  { slug: 'suppliers', title: 'Suppliers Report', description: 'Track supplier transactions and purchases.' },
  { slug: 'purchases', title: 'Purchase Report', description: 'Monitor purchase invoices and costs.' },
  { slug: 'product-movement', title: 'Product Movement Report', description: 'Track all product stock movements.' },
  { slug: 'users', title: 'Users Activity Report', description: 'Monitor user sales and performance.' },
  { slug: 'discounts', title: 'Discounts & Offers Report', description: 'Analyze discounts and offers impact.' },
];

const Reports: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Reports</h1>
      <p className="text-muted-foreground mb-8">Access and analyze your store’s key metrics and performance.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {operationalReports.map((report) => (
          <div
            key={report.slug}
            className="bg-white dark:bg-secondary-bg rounded-xl shadow p-6 flex flex-col justify-between border border-border-color cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/reports/${report.slug}`)}
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

export default Reports; 