import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrivagoLogo from '../components/TrivagoLogo';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    setLoading(true);
    try {
      await register({ username: form.username, password: form.password });
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
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
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
