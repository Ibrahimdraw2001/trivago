import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, TaskIcon, CrownIcon, DepositIcon, WithdrawIcon } from './icons';
import TrivagoLogo from './TrivagoLogo';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="phone-app">
      <header className="topbar">
        <TrivagoLogo height={26} />
        <button className="topbar-logout" onClick={handleLogout}>
          {user?.username} · خروج
        </button>
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
      </nav>
    </div>
  );
}
