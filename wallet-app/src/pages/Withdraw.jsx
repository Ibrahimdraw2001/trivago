import { useState } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';

const MIN_WITHDRAW = 500;

export default function Withdraw() {
  const { notify } = useToast();
  const [form, setForm] = useState({ amount: '', shamCashNumber: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.withdrawals.submit({
        amount: Number(form.amount),
        shamCashNumber: form.shamCashNumber,
      });
      setMessage('تم إرسال طلب السحب. سيحول الأدمن المبلغ عبر شام كاش ثم يعتمد الطلب.');
      notify('تم إرسال طلب السحب');
      setForm({ amount: '', shamCashNumber: '' });
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="m-card">
        <div className="m-card-title">سحب عبر شام كاش</div>
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>رقم محفظة شام كاش</label>
            <input value={form.shamCashNumber} onChange={(e) => setForm({ ...form, shamCashNumber: e.target.value })} placeholder="مثال: 0991234567" required />
          </div>
          <div className="form-group">
            <label>المبلغ المراد سحبه (ل.س)</label>
            <input type="number" min={MIN_WITHDRAW} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الإرسال...' : 'إرسال طلب السحب'}
          </button>
        </form>
        <p style={{ color: '#9aa3b2', fontSize: 12, marginTop: 12 }}>
          الحد الأدنى للسحب هو {MIN_WITHDRAW} ل.س، وسيُخصم المبلغ من رصيدك فور إرسال الطلب ويُعاد إليك إذا رُفض.
        </p>
      </div>
    </div>
  );
}
