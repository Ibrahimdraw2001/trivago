import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useToast } from '../context/ToastContext';

export default function Referrals() {
  const { notify } = useToast();
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [copied, setCopied] = useState(false);

  const load = () => {
    api.referrals.stats().then(setStats).catch(() => {});
    api.referrals.list().then(setItems).catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const copyCode = () => {
    if (!stats?.referralCode) return;
    navigator.clipboard.writeText(stats.referralCode).then(() => {
      setCopied(true);
      notify('تم نسخ كود الدعوة');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  if (!stats) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div>
      <div className="m-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
        <h2 style={{ fontSize: 17, marginBottom: 4 }}>ادعُ أصدقاءك واحصل على مكافآت</h2>
        <p style={{ color: '#9aa3b2', fontSize: 13, marginBottom: 16 }}>
          شارك كود الدعوة الخاص بك. عند شراء صديقك للمستوى، تحصل أنت وصديقك على مكافأة!
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <span className="referral-code">{stats.referralCode}</span>
          <button className="btn-primary" onClick={copyCode} style={{ padding: '8px 16px', fontSize: 13 }}>
            {copied ? 'تم النسخ ✓' : 'نسخ'}
          </button>
        </div>

        <div className="referral-stats-grid">
          <div className="referral-stat">
            <div className="referral-stat-value">{stats.total}</div>
            <div className="referral-stat-label">إجمالي الدعوات</div>
          </div>
          <div className="referral-stat">
            <div className="referral-stat-value" style={{ color: '#16a34a' }}>{stats.completed}</div>
            <div className="referral-stat-label">ناجحة</div>
          </div>
          <div className="referral-stat">
            <div className="referral-stat-value" style={{ color: '#f59e0b' }}>{stats.pending}</div>
            <div className="referral-stat-label">قيد الانتظار</div>
          </div>
          <div className="referral-stat">
            <div className="referral-stat-value" style={{ color: '#6b7280' }}>{stats.remaining}</div>
            <div className="referral-stat-label">متبقية</div>
          </div>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card-title">
          <span>جدول الدعوات</span>
          <span style={{ color: '#9aa3b2', fontSize: 12 }}>{stats.total} / 15</span>
        </div>
        {items.length === 0 ? (
          <p style={{ color: '#9aa3b2', textAlign: 'center', padding: '16px 0', fontSize: 13 }}>
            لم تقم بأي دعوة بعد. شارك كودك مع أصدقائك!
          </p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>المدعو</th>
                  <th>المستوى</th>
                  <th>الحالة</th>
                  <th>مكافأة الداعم</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.invitee_name}</td>
                    <td>{item.level_name || '—'}</td>
                    <td>
                      <span className={item.status === 'completed' ? 'status-approved' : 'status-pending'}>
                        {item.status === 'completed' ? 'ناجحة' : 'قيد الانتظار'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: item.status === 'completed' ? '#16a34a' : '#6b7280' }}>
                      {item.status === 'completed' ? `+${item.inviter_reward}$` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="m-card">
        <div className="m-card-title">مكافآت الدعوة</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>مستوى المدعو</th>
                <th>مكافأة الداعم</th>
                <th>مكافأة المدعو</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>المستوى 1</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>5$</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>2$</td>
              </tr>
              <tr>
                <td>المستوى 2</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>10$</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>4$</td>
              </tr>
              <tr>
                <td>المستوى 3</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>15$</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>5$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
