import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useToast } from '../../context/ToastContext';

export default function AdminDashboard() {
  const { notify } = useToast();
  const [stats, setStats] = useState(null);
  const [wallet, setWallet] = useState('');
  const [walletMsg, setWalletMsg] = useState('');
  const [walletErr, setWalletErr] = useState('');

  const [announcement, setAnnouncement] = useState({ text: '', active: false });
  const [annMsg, setAnnMsg] = useState('');

  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' });
  const [pwMsg, setPwMsg] = useState('');
  const [pwErr, setPwErr] = useState('');

  useEffect(() => {
    api.admin.stats().then(setStats).catch(() => {});
    api.settings.depositWallet().then((data) => setWallet(data.wallet)).catch(() => {});
    api.settings.announcement().then(setAnnouncement).catch(() => {});
  }, []);

  const saveWallet = async (e) => {
    e.preventDefault();
    setWalletErr('');
    setWalletMsg('');
    try {
      await api.settings.updateDepositWallet({ wallet });
      setWalletMsg('تم تحديث حساب الإيداع');
      notify('تم تحديث حساب الإيداع');
    } catch (err) {
      setWalletErr(err.message);
      notify(err.message, 'error');
    }
  };

  const saveAnnouncement = async (e) => {
    e.preventDefault();
    setAnnMsg('');
    try {
      await api.settings.updateAnnouncement(announcement);
      setAnnMsg('تم تحديث الإعلان');
      notify('تم تحديث الإعلان');
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwErr('');
    setPwMsg('');
    try {
      await api.admin.changePassword(pw);
      setPwMsg('تم تغيير كلمة المرور بنجاح');
      notify('تم تغيير كلمة المرور');
      setPw({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPwErr(err.message);
      notify(err.message, 'error');
    }
  };

  const exportCsv = (type) => {
    window.open(api.admin.exportCsv(type), '_blank');
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
            <div className="stat-value">{stats.totalBalance}$</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">عدد الفنادق</div>
            <div className="stat-value">{stats.hotels}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">إجمالي الإيداعات المقبولة</div>
            <div className="stat-value">{stats.totalDeposits}$</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">إجمالي السحوبات المقبولة</div>
            <div className="stat-value">{stats.totalWithdrawals}$</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">إجمالي التقييمات</div>
            <div className="stat-value">{stats.totalRatings}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">الإحالات الناجحة</div>
            <div className="stat-value">{stats.totalReferrals}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>تصدير البيانات (CSV)</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
          تصدير البيانات بصيغة CSV للاستخدام في برامج الجداول.
        </p>
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
          <button className="btn-gray" onClick={() => exportCsv('users')}>📥 المستخدمون</button>
          <button className="btn-gray" onClick={() => exportCsv('deposits')}>📥 الإيداعات</button>
          <button className="btn-gray" onClick={() => exportCsv('withdrawals')}>📥 السحوبات</button>
          <button className="btn-gray" onClick={() => exportCsv('transactions')}>📥 العمليات</button>
          <button className="btn-gray" onClick={() => exportCsv('ratings')}>📥 التقييمات</button>
        </div>
      </div>

      <div className="card">
        <h2>عنوان محفظة USDT (شبكة BEP-20)</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
          العنوان الذي يظهر للمستخدمين في صفحة الإيداع لتحويل USDT إليه.
        </p>
        {walletErr && <div className="alert alert-error">{walletErr}</div>}
        {walletMsg && <div className="alert alert-success">{walletMsg}</div>}
        <form onSubmit={saveWallet} className="inline-form">
          <div className="form-group">
            <label>عنوان المحفظة</label>
            <input value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="مثال: 0x1a2b3c4d5e6f..." required />
          </div>
          <button className="btn-primary" type="submit">حفظ</button>
        </form>
      </div>

      <div className="card">
        <h2>إعلان للمستخدمين</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
          يظهر في أعلى الصفحة الرئيسية لكل المستخدمين.
        </p>
        {annMsg && <div className="alert alert-success">{annMsg}</div>}
        <form onSubmit={saveAnnouncement} className="inline-form">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>نص الإعلان</label>
            <textarea value={announcement.text} onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })} rows="3" />
          </div>
          <div className="form-group">
            <label>تفعيل الإعلان</label>
            <select
              value={announcement.active ? 1 : 0}
              onChange={(e) => setAnnouncement({ ...announcement, active: Number(e.target.value) === 1 })}
            >
              <option value={1}>نشط</option>
              <option value={0}>غير نشط</option>
            </select>
          </div>
          <button className="btn-primary" type="submit">حفظ الإعلان</button>
        </form>
      </div>

      <div className="card">
        <h2>تغيير كلمة مرور الأدمن</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>
          يُنصح باستخدام كلمة مرور قوية من 8 أحرف على الأقل.
        </p>
        {pwErr && <div className="alert alert-error">{pwErr}</div>}
        {pwMsg && <div className="alert alert-success">{pwMsg}</div>}
        <form onSubmit={savePassword} className="inline-form">
          <div className="form-group">
            <label>كلمة المرور الحالية</label>
            <input type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>كلمة المرور الجديدة</label>
            <input type="password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} minLength={8} required />
          </div>
          <button className="btn-primary" type="submit">تغيير كلمة المرور</button>
        </form>
      </div>
    </div>
  );
}
