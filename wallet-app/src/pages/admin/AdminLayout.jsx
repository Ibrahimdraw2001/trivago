import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TrivagoLogo from '../../components/TrivagoLogo';

export default function AdminLayout() {
  const { user, logout } = useAuth();
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
