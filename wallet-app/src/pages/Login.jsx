import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrivagoLogo from '../components/TrivagoLogo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
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
        <h1>تسجيل الدخول</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>اسم المستخدم</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required maxLength={30} />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{ width: '100%', paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9aa3b2', cursor: 'pointer', fontSize: 18 }}>{showPass ? '🙈' : '👁'}</button>
            </div>
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الدخول...' : 'دخول'}
          </button>
        </form>
        <div className="sub">
          ليس لديك حساب؟ <Link to="/register">أنشئ حساباً جديداً</Link>
        </div>
        <div className="sub">
          <Link to="/terms">قوانين الاستخدام</Link>
        </div>
      </div>
    </div>
  );
}
