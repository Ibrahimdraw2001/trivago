import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { setOnUnauthorized } from './api/client';
import Login from './pages/Login';
import Register from './pages/Register';
import Terms from './pages/Terms';
import Layout from './components/Layout';
import Wallet from './pages/Wallet';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Levels from './pages/Levels';
import Tasks from './pages/Tasks';
import Transactions from './pages/Transactions';
import Account from './pages/Account';
import Referrals from './pages/Referrals';
import { ProtectedRoute, AdminRoute } from './components/Routes';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDeposits from './pages/admin/AdminDeposits';
import AdminWithdrawals from './pages/admin/AdminWithdrawals';
import AdminVideos from './pages/admin/AdminVideos';
import AdminLevels from './pages/admin/AdminLevels';
import AdminUsers from './pages/admin/AdminUsers';

export default function App() {
  const { logout } = useAuth();

  useEffect(() => {
    setOnUnauthorized(() => {
      logout();
    });
    return () => setOnUnauthorized(null);
  }, [logout]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Wallet />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="levels" element={<Levels />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="deposits" element={<AdminDeposits />} />
        <Route path="withdrawals" element={<AdminWithdrawals />} />
        <Route path="hotels" element={<AdminVideos />} />
        <Route path="levels" element={<AdminLevels />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
