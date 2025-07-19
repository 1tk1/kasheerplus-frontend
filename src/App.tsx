import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { StoreSettingsProvider } from './contexts/StoreSettingsContext.tsx'
import { LoadingProvider } from './contexts/LoadingContext.tsx'
import ProtectedRoute from './components/shared/ProtectedRoute.tsx'
import AppLayout from './components/layout/AppLayout.tsx'
import Auth from './pages/Auth.tsx'
import Signup from './pages/Signup.tsx'
import Index from './pages/Index.tsx'
import POS from './pages/POS.tsx'
import Inventory from './pages/Inventory.tsx'
import Customers from './pages/Customers.tsx'
import Suppliers from './pages/Suppliers.tsx'
import Invoices from './pages/Invoices.tsx'
import Finance from './pages/Finance.tsx'
import Reports from './pages/Reports.tsx'
import Settings from './pages/Settings.tsx'
import AdminPanel from './pages/AdminPanel.tsx'
import SuperAdminPanel from './pages/SuperAdminPanel.tsx'
import OperationalReportDetails from './pages/report-details/OperationalReportDetails.tsx';
import FinancialReportDetails from './pages/report-details/FinancialReportDetails.tsx';

function App() {
  return (
    <AuthProvider>
      <StoreSettingsProvider>
        <LoadingProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Index />} />
              <Route path="pos" element={<POS />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customers" element={<Customers />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="finance" element={<Finance />} />
              <Route path="finance/:slug" element={<FinancialReportDetails />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:slug" element={<OperationalReportDetails />} />
              <Route path="settings" element={<Settings />} />
              <Route path="admin" element={<AdminPanel />} />
              <Route path="super-admin" element={<SuperAdminPanel />} />
            </Route>
          </Routes>
        </LoadingProvider>
      </StoreSettingsProvider>
    </AuthProvider>
  )
}

export default App 