import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { HomeIcon, TaskIcon, CrownIcon, DepositIcon, WithdrawIcon, MoonIcon, SunIcon, InviteIcon, HistoryIcon } from './icons';
import TrivagoLogo from './TrivagoLogo';

export default function Layout() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="phone-app">
      <header className="topbar">
        <TrivagoLogo height={26} />
        <div className="topbar-actions">
          <button className="theme-toggle" type="button" onClick={toggle} aria-label="تبديل الوضع الليلي">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="topbar-btn" type="button" onClick={() => navigate('/stats')}>
            📊
          </button>
          <button className="topbar-btn" type="button" onClick={() => navigate('/account')}>
            {user?.username}
          </button>
          <button className="topbar-btn" type="button" onClick={handleLogout}>
            خروج
          </button>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <NavLink to="/" end>
          <HomeIcon />
          <span>الرئيسية</span>
        </NavLink>
        <NavLink to="/tasks">
          <TaskIcon />
          <span>المهام</span>
        </NavLink>
        <NavLink to="/levels">
          <CrownIcon />
          <span>المستويات</span>
        </NavLink>
        <NavLink to="/deposit">
          <DepositIcon />
          <span>إيداع</span>
        </NavLink>
        <NavLink to="/withdraw">
          <WithdrawIcon />
          <span>سحب</span>
        </NavLink>
        <NavLink to="/activity">
          <HistoryIcon />
          <span>النشاط</span>
        </NavLink>
        <NavLink to="/referrals">
          <InviteIcon />
          <span>الدعوة</span>
        </NavLink>
      </nav>
    </div>
  );
}
