import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '../../components/icons';
import TrivagoLogo from '../../components/TrivagoLogo';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <TrivagoLogo height={22} />
          <span>لوحة الإدارة</span>
        </div>
        <nav>
          <NavLink to="/admin" end>الإحصائيات</NavLink>
          <NavLink to="/admin/deposits">طلبات الإيداع</NavLink>
          <NavLink to="/admin/withdrawals">طلبات السحب</NavLink>
          <NavLink to="/admin/hotels">إدارة الفنادق</NavLink>
          <NavLink to="/admin/levels">إدارة المستويات</NavLink>
          <NavLink to="/admin/users">المستخدمون</NavLink>
        </nav>
        <button className="theme-toggle" type="button" onClick={toggle} aria-label="تبديل الوضع الليلي" style={{ width: 32, height: 32, margin: '10px auto 0', flexShrink: 0 }}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="logout-btn" onClick={handleLogout}>
          خروج الأدمن ({user?.username})
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
