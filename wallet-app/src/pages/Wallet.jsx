import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { DepositIcon, WithdrawIcon, CrownIcon, TaskIcon, HistoryIcon } from '../components/icons';

export default function Wallet() {
  const { user, refresh } = useAuth();
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    refresh().catch(() => {});
    api.deposits.mine().then(setDeposits).catch(() => {});
    api.withdrawals.mine().then(setWithdrawals).catch(() => {});
  }, []);

  const all = [
    ...deposits.map((d) => ({ ...d, kind: 'إيداع', sign: '+' })),
    ...withdrawals.map((w) => ({ ...w, kind: 'سحب', sign: '-' })),
  ]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 4);

  return (
    <div>
      <div className="balance-card">
        <div className="label">رصيدك الحالي</div>
        <div className="amount">{user?.balance ?? 0}</div>
        <span className="level-chip">
          {user?.level_name ? `${user.level_name} ✓` : 'لم تشترك بأي مستوى بعد'}
        </span>
        <div className="balance-actions">
          <Link to="/deposit">
            <DepositIcon />
            <div>إيداع</div>
          </Link>
          <Link to="/withdraw">
            <WithdrawIcon />
            <div>سحب</div>
          </Link>
          <Link to="/tasks">
            <TaskIcon />
            <div>مهام</div>
          </Link>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card-title">
          <span>آخر العمليات</span>
          <Link to="/transactions" className="link">عرض الكل</Link>
        </div>
        {all.length === 0 ? (
          <p style={{ color: '#9aa3b2', textAlign: 'center', padding: '12px 0', fontSize: 13 }}>
            لا توجد عمليات بعد
          </p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>النوع</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {all.map((item) => (
                  <tr key={`${item.kind}-${item.id}`}>
                    <td>{item.kind}</td>
                    <td style={{ fontWeight: 700, color: item.sign === '+' ? '#16a34a' : '#dc2626' }}>
                      {item.sign}
                      {item.amount}
                    </td>
                    <td>
                      <span className={`status-${item.status}`}>{item.status}</span>
                    </td>
                    <td style={{ color: '#9aa3b2', fontSize: 12 }}>{item.created_at.slice(0, 16)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="m-card">
        <div className="m-card-title">
          <span>مستوى حسابك</span>
          <Link to="/levels" className="link">تغيير</Link>
        </div>
        <p style={{ color: '#6b7280', fontSize: 13 }}>
          {user?.level_name
            ? 'متابعة تقييم الفنادق يومياً لكسب المزيد من المكافآت.'
            : 'اشترك بمستوى لتبدأ بتقييم الفنادق وكسب المكافآت.'}
        </p>
      </div>
    </div>
  );
}
