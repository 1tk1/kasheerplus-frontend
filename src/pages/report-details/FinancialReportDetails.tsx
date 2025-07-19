import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const reportsConfig: Record<string, any> = {
  pnl: {
    title: 'Profit & Loss Statement',
    kpis: ['Revenue', 'COGS', 'Gross Profit', 'Expenses', 'Net Profit'],
    columns: ['Revenue', 'COGS', 'Gross Profit', 'Expenses', 'Net Profit'],
    charts: [
      { type: 'Bar', label: 'Revenue vs Expenses' },
      { type: 'Line', label: 'Net Profit Over Time' }
    ],
    filters: ['Date Range'],
    export: true,
    compare: false
  },
  'cash-flow': {
    title: 'Cash Flow Statement',
    kpis: ['Net Cash Flow', 'Opening Balance', 'Closing Balance'],
    columns: ['Type', 'Source', 'Date', 'Amount', 'Balance After'],
    charts: [
      { type: 'Area', label: 'Monthly Cash Flow' },
      { type: 'Bar', label: 'Cash Flow by Category' }
    ],
    filters: ['Date Range', 'Category'],
    export: true,
    compare: false
  },
  expenses: {
    title: 'Expenses Report',
    kpis: ['Total Expenses'],
    columns: ['Expense Name', 'Category', 'Amount', 'Date', 'Employee', 'Attachment'],
    charts: [
      { type: 'Pie', label: 'Expenses by Type' },
      { type: 'Line', label: 'Monthly Expenses Trend' }
    ],
    filters: ['Date Range', 'Category'],
    export: true,
    compare: false
  },
  income: {
    title: 'Income Report',
    kpis: ['Total Income'],
    columns: ['Source', 'Date', 'Amount', 'Payment Method', 'Employee'],
    charts: [],
    filters: ['Date Range', 'Source'],
    export: true,
    compare: false
  },
  receivables: {
    title: 'Receivables & Payables',
    kpis: ['Total Receivables', 'Total Payables'],
    columns: ['Name', 'Type', 'Date', 'Amount', 'Status'],
    charts: [
      { type: 'Bar', label: 'Receivables vs Payables' }
    ],
    filters: ['Date Range', 'Type'],
    export: true,
    compare: false
  },
  tax: {
    title: 'Tax Report',
    kpis: ['Total Taxable Sales', 'Total Tax Collected'],
    columns: ['Tax Type', 'Taxable Sales', 'Tax Collected', 'Included Invoices', 'Period'],
    charts: [],
    filters: ['Date Range', 'Tax Type'],
    export: true,
    compare: false
  },
  'cash-bank': {
    title: 'Cash & Bank Report',
    kpis: ['Total Cash', 'Total Bank Balance'],
    columns: ['Account', 'Opening Balance', 'In/Out', 'Closing Balance', 'User'],
    charts: [],
    filters: ['Date Range', 'Account'],
    export: true,
    compare: false
  },
  assets: {
    title: 'Assets & Depreciation',
    kpis: ['Total Assets', 'Total Depreciation'],
    columns: ['Asset Name', 'Asset Type', 'Purchase Date', 'Original Value', 'Depreciation Rate', 'Current Value'],
    charts: [],
    filters: ['Date Range', 'Asset Type'],
    export: true,
    compare: false
  },
};

const FinancialReportDetails: React.FC = () => {
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

export default FinancialReportDetails; 