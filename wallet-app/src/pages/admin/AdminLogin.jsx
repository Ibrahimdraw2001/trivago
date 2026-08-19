import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';
import TrivagoLogo from '../../components/TrivagoLogo';

export default function AdminLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await api.request('/auth/admin-login', { method: 'POST', body: form });
      setUser(result.user);
      navigate('/admin');
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
          <TrivagoLogo height={40} />
          <span className="auth-tagline">لوحة تحكم الأدمن</span>
        </div>
        <h1>تسجيل دخول الأدمن</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>اسم المستخدم</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required maxLength={30} />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
