import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { StoreSettingsProvider } from './contexts/StoreSettingsContext'
import { LoadingProvider } from './contexts/LoadingContext'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import Auth from './pages/Auth'
import Signup from './pages/Signup'
import Index from './pages/Index'
import POS from './pages/POS'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Invoices from './pages/Invoices'
import Finance from './pages/Finance'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import SuperAdminPanel from './pages/SuperAdminPanel'
import OperationalReportDetails from './pages/report-details/OperationalReportDetails';
import FinancialReportDetails from './pages/report-details/FinancialReportDetails';

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