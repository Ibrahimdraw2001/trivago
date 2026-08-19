import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useToast } from '../../context/ToastContext';

export default function AdminWithdrawals() {
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const load = () => {
    api.admin.withdrawals().then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id, action) => {
    setProcessingId(id);
    try {
      if (action === 'approve') {
        await api.admin.approveWithdrawal(id);
        notify('تمت الموافقة على السحب');
      } else {
        await api.admin.rejectWithdrawal(id);
        notify('تم رفض السحب وإرجاع المبلغ');
      }
      load();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setProcessingId(null);
      setConfirmAction(null);
    }
  };

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="card">
      <h2>طلبات السحب</h2>

      {confirmAction && (
        <div className="modal-backdrop" onClick={() => setConfirmAction(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{confirmAction.action === 'approve' ? 'الموافقة على السحب' : 'رفض السحب'}</h3>
            <p style={{ color: '#9aa3b2', marginBottom: 16 }}>
              {confirmAction.action === 'approve'
                ? `هل تريد الموافقة على سحب ${confirmAction.amount}$ للمستخدم ${confirmAction.username}؟`
                : `هل تريد رفض طلب سحب ${confirmAction.amount}$ من ${confirmAction.username}؟ سيتم إرجاع المبلغ.`}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={confirmAction.action === 'approve' ? 'btn-green' : 'btn-red'}
                onClick={() => act(confirmAction.id, confirmAction.action)}
                disabled={processingId === confirmAction.id}
              >
                {processingId === confirmAction.id ? 'جارٍ...' : 'تأكيد'}
              </button>
              <button className="btn-gray" onClick={() => setConfirmAction(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>عنوان محفظة USDT (BEP-20)</th>
              <th>المبلغ ($)</th>
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
                <td>{item.wallet_address || item.sham_cash_number}</td>
                <td>{item.amount}$</td>
                <td>
                  <span className={`status-${item.status}`}>{item.status}</span>
                </td>
                <td>{item.created_at}</td>
                <td>
                  {item.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn-green btn-sm"
                        disabled={processingId === item.id}
                        onClick={() => setConfirmAction({ id: item.id, action: 'approve', amount: item.amount, username: item.username })}
                      >
                        {processingId === item.id ? '...' : 'قبول'}
                      </button>
                      <button
                        className="btn-red btn-sm"
                        disabled={processingId === item.id}
                        onClick={() => setConfirmAction({ id: item.id, action: 'reject', amount: item.amount, username: item.username })}
                      >
                        {processingId === item.id ? '...' : 'رفض'}
                      </button>
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
