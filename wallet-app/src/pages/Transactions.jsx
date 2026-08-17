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
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = (p) => {
    setLoading(true);
    api
      .transactions(p)
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
      <div className="m-card-title">سجل العمليات ({total})</div>
      {items.length === 0 ? (
        <p style={{ color: '#9aa3b2', textAlign: 'center', padding: '16px 0' }}>لا توجد عمليات بعد</p>
      ) : (
        <>
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
                    <td style={{ color: '#9aa3b2', fontSize: 12 }}>{(item.created_at || '').slice(0, 16)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
