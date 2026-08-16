import { useEffect, useState } from 'react';
import { api } from '../api';
import { WalletIcon } from '../components/icons';

export default function Deposit() {
  const [wallet, setWallet] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ amount: '', shamTxnId: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.settings
      .depositWallet()
      .then((data) => setWallet(data.wallet))
      .catch(() => {});
  }, []);

  const copyWallet = () => {
    navigator.clipboard
      .writeText(wallet)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.deposits.submit({
        amount: Number(form.amount),
        shamTxnId: form.shamTxnId,
      });
      setMessage('تم إرسال طلب الإيداع بنجاح. بانتظار موافقة الأدمن.');
      setForm({ amount: '', shamTxnId: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="deposit-wallet-box">
        <h3>
          <WalletIcon /> حوّل إلى حساب شام كاش التالي
        </h3>
        <p>بعد التحويل، انسخ رقم العملية وأدخله بالأسفل لإرسال طلب الإيداع</p>
        <div className="wallet-number-row">
          {wallet || 'جارٍ التحميل...'}
          <button className="btn-primary" type="button" onClick={copyWallet}>
            {copied ? 'تم النسخ ✓' : 'نسخ'}
          </button>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card-title">إرسال طلب الإيداع</div>
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>المبلغ المراد إيداعه (ل.س)</label>
            <input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>رقم عملية الدفع من شام كاش</label>
            <input value={form.shamTxnId} onChange={(e) => setForm({ ...form, shamTxnId: e.target.value })} placeholder="مثال: SC20260815001" required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الإرسال...' : 'إرسال طلب الإيداع'}
          </button>
        </form>
      </div>
    </div>
  );
}
