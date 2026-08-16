import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useToast } from '../../context/ToastContext';

export default function AdminDeposits() {
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.admin.deposits().then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id, action) => {
    try {
      if (action === 'approve') {
        await api.admin.approveDeposit(id);
        notify('تمت الموافقة على الإيداع وإضافة الرصيد');
      } else {
        await api.admin.rejectDeposit(id);
        notify('تم رفض طلب الإيداع');
      }
      load();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="card">
      <h2>طلبات الإيداع</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>المبلغ</th>
              <th>رقم العملية</th>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#6b7280' }}>لا توجد طلبات</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.amount} ل.س</td>
                <td>{item.sham_txn_id}</td>
                <td>
                  <span className={`status-${item.status}`}>{item.status}</span>
                </td>
                <td>{item.created_at}</td>
                <td>
                  {item.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-green btn-sm" onClick={() => act(item.id, 'approve')}>قبول</button>
                      <button className="btn-red btn-sm" onClick={() => act(item.id, 'reject')}>رفض</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
