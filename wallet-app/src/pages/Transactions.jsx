import { useEffect, useState } from 'react';
import { api } from '../api';

const TYPE_LABELS = {
  deposit: 'إيداع',
  withdraw: 'سحب',
  withdraw_refund: 'إرجاع سحب',
  level: 'شراء مستوى',
  reward: 'مكافأة تقييم',
};

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .transactions()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="m-card">
      <div className="m-card-title">سجل العمليات</div>
      {items.length === 0 ? (
        <p style={{ color: '#9aa3b2', textAlign: 'center', padding: '16px 0' }}>لا توجد عمليات بعد</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>النوع</th>
                <th>المبلغ</th>
                <th>الرصيد بعدها</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div>{TYPE_LABELS[item.type] || item.type}</div>
                    <div style={{ color: '#9aa3b2', fontSize: 11 }}>{item.description}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: item.amount >= 0 ? '#16a34a' : '#dc2626' }}>
                    {item.amount >= 0 ? '+' : ''}
                    {item.amount}$
                  </td>
                  <td>{item.balance_after}$</td>
                  <td style={{ color: '#9aa3b2', fontSize: 12 }}>{item.created_at.slice(0, 16)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
