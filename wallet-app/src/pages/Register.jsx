import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrivagoLogo from '../components/TrivagoLogo';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirm: '', referralCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(form.password)) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط');
      return;
    }
    setLoading(true);
    try {
      await register({ username: form.username, password: form.password, referralCode: form.referralCode || undefined });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <TrivagoLogo height={44} />
          <span className="auth-tagline">قارن الفنادق · قيّم · اربح المكافآت</span>
        </div>
        <h1>إنشاء حساب</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>اسم المستخدم</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{ width: '100%', paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9aa3b2', cursor: 'pointer', fontSize: 18 }}>{showPass ? '🙈' : '👁'}</button>
            </div>
            <div className="form-hint">6 أحرف على الأقل، أحرف وأرقام فقط.</div>
          </div>
          <div className="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type={showPass ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>كود الدعوة (اختياري)</label>
            <input value={form.referralCode} onChange={(e) => setForm({ ...form, referralCode: e.target.value.toUpperCase() })} placeholder="مثال: A1B2C3" maxLength={6} style={{ textTransform: 'uppercase', letterSpacing: 2 }} />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الإنشاء...' : 'إنشاء الحساب'}
          </button>
        </form>
        <div className="sub">
          لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link>
        </div>
        <div className="sub">
          <Link to="/terms">قوانين الاستخدام</Link>
        </div>
      </div>
    </div>
  );
}
