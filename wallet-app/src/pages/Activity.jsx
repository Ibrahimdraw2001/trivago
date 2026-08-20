import { useEffect, useState } from 'react';
import { api } from '../api';

const ACTION_LABELS = {
  login: 'تسجيل دخول',
  admin_login: 'دخول الأدمن',
  register: 'تسجيل حساب',
  rate_hotel: 'تقييم فندق',
  purchase_level: 'شراء مستوى',
  submit_deposit: 'طلب إيداع',
  submit_withdrawal: 'طلب سحب',
  deposit_approved: 'إيداع مقبول',
  withdrawal_approved: 'سحب مقبول',
  change_password: 'تغيير كلمة المرور',
};

const ACTION_ICONS = {
  login: '🔑',
  admin_login: '🔐',
  register: '👤',
  rate_hotel: '⭐',
  purchase_level: '👑',
  submit_deposit: '💰',
  submit_withdrawal: '💸',
  deposit_approved: '✅',
  withdrawal_approved: '✅',
  change_password: '🔒',
};

export default function Activity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = (p) => {
    setLoading(true);
    api.activity.mine(p)
      .then((res) => {
        setItems(res.items);
        setPages(res.pages);
        setTotal(res.total);
        setPage(res.page);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(1);
  }, []);

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="m-card">
      <div className="m-card-title">سجل النشاط ({total})</div>
      {items.length === 0 ? (
        <p style={{ color: '#9aa3b2', textAlign: 'center', padding: '16px 0' }}>لا يوجد نشاط بعد</p>
      ) : (
        <>
          <div className="activity-list">
            {items.map((item) => (
              <div className="activity-item" key={item.id}>
                <div className="activity-icon">{ACTION_ICONS[item.action] || '📋'}</div>
                <div className="activity-body">
                  <div className="activity-action">{ACTION_LABELS[item.action] || item.action}</div>
                  {item.details && <div className="activity-details">{item.details}</div>}
                  <div className="activity-time">{(item.created_at || '').slice(0, 16)}</div>
                </div>
              </div>
            ))}
          </div>
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
              <button className="btn-gray btn-sm" disabled={page <= 1} onClick={() => load(page - 1)}>السابق</button>
              <span style={{ color: '#9aa3b2', fontSize: 13, alignSelf: 'center' }}>{page} / {pages}</span>
              <button className="btn-gray btn-sm" disabled={page >= pages} onClick={() => load(page + 1)}>التالي</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
