import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [wallet, setWallet] = useState('');
  const [walletMsg, setWalletMsg] = useState('');
  const [walletErr, setWalletErr] = useState('');

  useEffect(() => {
    api.admin.stats().then(setStats).catch(() => {});
    api.settings.depositWallet().then((data) => setWallet(data.wallet)).catch(() => {});
  }, []);

  const saveWallet = async (e) => {
    e.preventDefault();
    setWalletErr('');
    setWalletMsg('');
    try {
      await api.settings.updateDepositWallet({ wallet });
      setWalletMsg('تم تحديث حساب الإيداع');
    } catch (err) {
      setWalletErr(err.message);
    }
  };

  if (!stats) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div>
      <div className="card">
        <h2>نظرة عامة</h2>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">عدد المستخدمين</div>
            <div className="stat-value">{stats.users}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">طلبات إيداع معلقة</div>
            <div className="stat-value">{stats.pendingDeposits}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">طلبات سحب معلقة</div>
            <div className="stat-value">{stats.pendingWithdrawals}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">إجمالي أرصدة المستخدمين</div>
            <div className="stat-value">{stats.totalBalance} ل.س</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">عدد الفنادق</div>
            <div className="stat-value">{stats.hotels}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>حساب الإيداع عبر شام كاش</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
          الرقم الذي يظهر للمستخدمين في صفحة الإيداع لتحويل المبالغ إليه.
        </p>
        {walletErr && <div className="alert alert-error">{walletErr}</div>}
        {walletMsg && <div className="alert alert-success">{walletMsg}</div>}
        <form onSubmit={saveWallet} className="inline-form">
          <div className="form-group">
            <label>رقم المحفظة</label>
            <input value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="مثال: 0991234567" required />
          </div>
          <button className="btn-primary" type="submit">حفظ</button>
        </form>
      </div>
    </div>
  );
}
