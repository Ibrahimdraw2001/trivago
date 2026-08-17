import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../api';
import { KeyIcon, InviteIcon } from '../components/icons';

export default function Account() {
  const { user, refresh } = useAuth();
  const { notify } = useToast();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirm) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(form.newPassword)) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط');
      return;
    }
    setLoading(true);
    try {
      await api.auth.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      notify('تم تغيير كلمة المرور بنجاح');
      setForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setLoading(false);
      refresh().catch(() => {});
    }
  };

  return (
    <div>
      <div className="m-card" style={{ textAlign: 'center', padding: 24 }}>
        <div className="account-avatar">{(user?.username || '؟')[0]}</div>
        <div className="account-info">
          <h3>{user?.username}</h3>
          <span className="account-role">{user?.role === 'admin' ? 'مدير النظام' : 'مستخدم'}</span>
        </div>
        <div className="account-rows">
          <div className="account-row">
            <span>الرصيد</span>
            <strong>{user?.balance ?? 0}$</strong>
          </div>
          <div className="account-row">
            <span>المستوى</span>
            <strong>{user?.level_name || 'لا يوجد'}</strong>
          </div>
        </div>
      </div>

      <div className="m-card" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 8 }}>
          <InviteIcon style={{ width: 20, height: 20, verticalAlign: -4, marginLeft: 6 }} />
          <strong>كود الدعوة الخاص بك</strong>
        </div>
        <div className="referral-code">{user?.referral_code || '—'}</div>
        <Link to="/referrals" className="btn-gray" style={{ display: 'inline-block', marginTop: 12, padding: '8px 20px', fontSize: 13, textDecoration: 'none' }}>
          عرض الدعوات
        </Link>
      </div>

      <div className="m-card">
        <div className="m-card-title">
          <span><KeyIcon style={{ width: 16, height: 16, verticalAlign: -3, marginLeft: 6 }} /> تغيير كلمة المرور</span>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>كلمة المرور الحالية</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} required style={{ width: '100%', paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9aa3b2', cursor: 'pointer', fontSize: 18 }}>{showPass ? '🙈' : '👁'}</button>
            </div>
          </div>
          <div className="form-group">
            <label>كلمة المرور الجديدة</label>
            <input type={showPass ? 'text' : 'password'} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
            <div className="form-hint">6 أحرف على الأقل، أحرف وأرقام فقط.</div>
          </div>
          <div className="form-group">
            <label>تأكيد كلمة المرور الجديدة</label>
            <input type={showPass ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الحفظ...' : 'حفظ كلمة المرور'}
          </button>
        </form>
      </div>
    </div>
  );
}
