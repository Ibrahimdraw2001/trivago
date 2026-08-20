import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.userStats().then(setStats).catch(() => {});
  }, []);

  if (!stats) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div>
      <div className="m-card" style={{ textAlign: 'center', padding: 24 }}>
        <div className="stats-avatar">📊</div>
        <h2 style={{ fontSize: 17, marginBottom: 4 }}>إحصائياتك</h2>
        <p style={{ color: '#9aa3b2', fontSize: 13 }}>{stats.username}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-box-icon">💰</div>
          <div className="stat-box-value">{stats.balance}$</div>
          <div className="stat-box-label">الرصيد الحالي</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">⭐</div>
          <div className="stat-box-value">{stats.totalRatings}</div>
          <div className="stat-box-label">إجمالي التقييمات</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">🏨</div>
          <div className="stat-box-value">{stats.uniqueHotelsRated}</div>
          <div className="stat-box-label">فنادق قيّمتها</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">📈</div>
          <div className="stat-box-value">{stats.totalEarnings}$</div>
          <div className="stat-box-label">إجمالي الأرباح</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">📥</div>
          <div className="stat-box-value">{stats.totalDeposits}$</div>
          <div className="stat-box-label">إجمالي الإيداعات</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">📤</div>
          <div className="stat-box-value">{stats.totalWithdrawals}$</div>
          <div className="stat-box-label">إجمالي السحوبات</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">👥</div>
          <div className="stat-box-value">{stats.referralCount}</div>
          <div className="stat-box-label">الإحالات الناجحة</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-icon">🎁</div>
          <div className="stat-box-value">{stats.referralEarnings}$</div>
          <div className="stat-box-label">أرباح الإحالات</div>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card-title">نشاط اليوم</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <span style={{ color: '#9aa3b2', fontSize: 13 }}>تقييمات اليوم</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{stats.todayRatings} / {stats.dailyLimit}</span>
        </div>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="fill" style={{ width: `${Math.min(100, (stats.todayRatings / (stats.dailyLimit || 1)) * 100)}%` }} />
        </div>
        <p style={{ color: '#9aa3b2', fontSize: 12, marginTop: 8 }}>
          مكافأة كل تقييم: {stats.rewardPerHotel}$ • المستوى: {stats.levelName || 'لا يوجد'}
        </p>
      </div>

      {stats.weeklyEarnings.length > 0 && (
        <div className="m-card">
          <div className="m-card-title">أرباح آخر 7 أيام</div>
          <div className="weekly-chart">
            {stats.weeklyEarnings.map((day) => (
              <div className="weekly-bar" key={day.day}>
                <div className="bar-fill" style={{ height: `${Math.min(100, (day.total / (stats.rewardPerHotel || 1)) * 20)}%` }} />
                <span className="bar-label">{day.day.slice(5)}</span>
                <span className="bar-value">{day.total}$</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.recentRatings.length > 0 && (
        <div className="m-card">
          <div className="m-card-title">آخر التقييمات</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>الفندق</th>
                  <th>النجوم</th>
                  <th>المكافأة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentRatings.map((r) => (
                  <tr key={r.id}>
                    <td>{r.hotel_name}</td>
                    <td>{r.stars}⭐</td>
                    <td style={{ color: '#16a34a', fontWeight: 700 }}>{r.reward}$</td>
                    <td style={{ color: '#9aa3b2', fontSize: 12 }}>{(r.created_at || '').slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
