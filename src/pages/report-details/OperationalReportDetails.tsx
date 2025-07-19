import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const reportsConfig: Record<string, any> = {
  sales: {
    title: 'Sales Report',
    kpis: ['Total Sales', 'Invoice Count', 'Avg. Invoice Value'],
    columns: ['Invoice #', 'Customer Name', 'Product Count', 'Total Amount', 'Date & Time', 'Payment Method', 'Employee'],
    charts: [
      { type: 'Line', label: 'Sales Trend (Daily/Monthly)' },
      { type: 'Pie', label: 'Payment Method Distribution' }
    ],
    filters: ['Date Range', 'Employee', 'Branch', 'Payment Method'],
    export: true,
    compare: true
  },
  'top-products': {
    title: 'Top/Low Selling Products',
    kpis: ['Top Seller', 'Least Seller'],
    columns: ['Product Name', 'Sales Count', 'Quantity Sold', 'Total Revenue', 'Category'],
    charts: [
      { type: 'Bar', label: 'Top 10 Products' },
      { type: 'Table', label: 'Slow-moving Products (0 Sales)' }
    ],
    filters: ['Date Range', 'Compare Periods'],
    export: true,
    compare: true
  },
  pnl: {
    title: 'Profit & Loss (P&L)',
    kpis: ['Total Sales', 'COGS', 'Gross Profit', 'Expenses', 'Net Profit'],
    columns: ['Total Sales', 'COGS', 'Gross Profit', 'Expenses', 'Net Profit', 'Prev. Month Comparison'],
    charts: [
      { type: 'Bar', label: 'Monthly Profit/Cost' },
      { type: 'Line', label: 'Net Profit Over Time' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: true
  },
  inventory: {
    title: 'Inventory Report',
    kpis: ['Total Products', 'Low Stock', 'Inventory Value'],
    columns: ['Product Name', 'Current Qty', 'Critical Qty', 'Unit Cost', 'Total Value', 'Status'],
    charts: [
      { type: 'Donut', label: 'Active vs Inactive Products' },
      { type: 'Bar', label: 'Products Near Out-of-Stock' }
    ],
    filters: ['Category', 'Supplier'],
    export: true,
    compare: false
  },
  returns: {
    title: 'Returned Sales Report',
    kpis: ['Total Returns', 'Return Rate'],
    columns: ['Invoice #', 'Customer Name', 'Product Name', 'Qty Returned', 'Return Date', 'Reason'],
    charts: [
      { type: 'Pie', label: 'Return Reasons' },
      { type: 'Bar', label: 'Most Returned Products' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
  shifts: {
    title: 'Cash Register / Shift Report',
    kpis: ['Total Sales', 'Total Expenses', 'Net', 'Closing Balance'],
    columns: ['Employee', 'Start/End Time', 'Total Sales', 'Expenses', 'Net', 'Closing Balance'],
    charts: [
      { type: 'Line', label: 'Shift Performance' },
      { type: 'Bar', label: 'Sales by Payment Method' }
    ],
    filters: ['Date Range', 'Employee'],
    export: true,
    compare: false
  },
  customers: {
    title: 'Customers Report',
    kpis: ['Top Customer', 'Avg. Spend'],
    columns: ['Customer Name', 'Invoice Count', 'Total Purchases', 'Avg. Invoice Value', 'Last Purchase'],
    charts: [
      { type: 'Pie', label: 'Top Customers' },
      { type: 'Bar', label: 'Top 10 Customers' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
  suppliers: {
    title: 'Suppliers Report',
    kpis: ['Top Supplier', 'Total Purchases'],
    columns: ['Supplier Name', 'Invoice Count', 'Total Purchases', 'Linked Products', 'Last Supply'],
    charts: [
      { type: 'Bar', label: 'Suppliers by Purchase Value' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
  purchases: {
    title: 'Purchase Report',
    kpis: ['Total Purchases'],
    columns: ['Invoice #', 'Supplier', 'Purchase Date', 'Products & Quantities', 'Total Value', 'Employee'],
    charts: [],
    filters: ['Date Range', 'Supplier'],
    export: true,
    compare: false
  },
  'product-movement': {
    title: 'Product Movement Report',
    kpis: ['Total Movements'],
    columns: ['Product Name', 'Movement Type', 'Quantity', 'Date', 'User'],
    charts: [],
    filters: ['Date Range', 'Movement Type'],
    export: true,
    compare: false
  },
  users: {
    title: 'Users Activity Report',
    kpis: ['Top User', 'Total Sales'],
    columns: ['User Name', 'Invoice Count', 'Total Sales', 'Avg. Invoice', 'Performance'],
    charts: [
      { type: 'Bar', label: 'User Comparison' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
  discounts: {
    title: 'Discounts & Offers Report',
    kpis: ['Total Discounts'],
    columns: ['Offer Name', 'Discount Type', 'Included Products', 'Start/End Date', 'Total Discount Value'],
    charts: [],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
};

const OperationalReportDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const report = slug ? reportsConfig[slug] : null;

  if (!report) {
    return <div className="p-8 max-w-5xl mx-auto">Report not found.</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-accent hover:underline">&larr; Back</button>
      <h1 className="text-3xl font-bold mb-2 text-foreground">{report.title}</h1>
      {/* KPIs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {report.kpis.map((kpi: string, i: number) => (
          <div key={i} className="bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold text-sm min-w-[120px] text-center">
            {kpi} <span className="block text-xs text-muted-foreground">[Value]</span>
          </div>
        ))}
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {report.filters.map((filter: string, i: number) => (
          <div key={i} className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">{filter}</label>
            <input className="border border-border-color rounded px-2 py-1 min-w-[120px]" placeholder={filter} disabled />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-border-color rounded-lg">
          <thead>
            <tr>
              {report.columns.map((col: string, i: number) => (
                <th key={i} className="px-4 py-2 bg-muted text-text-primary text-sm font-semibold border-b border-border-color whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={report.columns.length} className="text-center text-muted-foreground py-8">[Data Placeholder]</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {report.charts.map((chart: any, i: number) => (
          <div key={i} className="bg-muted dark:bg-secondary-bg rounded-lg h-48 flex items-center justify-center text-muted-foreground border border-dashed border-border-color">
            <span className="text-sm">{chart.type} Chart: {chart.label}</span>
          </div>
        ))}
      </div>
      {/* Export/Print/Compare */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        {report.export && (
          <>
            <button className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium" disabled>Export PDF</button>
            <button className="bg-accent/80 text-white px-4 py-2 rounded-md text-sm font-medium" disabled>Export Excel</button>
            <button className="bg-muted text-accent px-4 py-2 rounded-md text-sm font-medium border border-accent" disabled>Print</button>
          </>
        )}
        {report.compare && (
          <button className="bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-medium border border-primary" disabled>Compare Periods</button>
        )}
      </div>
    </div>
  );
};

export default OperationalReportDetails; 