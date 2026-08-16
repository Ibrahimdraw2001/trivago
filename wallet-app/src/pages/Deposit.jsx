import { useEffect, useState } from 'react';
import { api } from '../api';
import { useToast } from '../context/ToastContext';
import { WalletIcon } from '../components/icons';

export default function Deposit() {
  const { notify } = useToast();
  const [wallet, setWallet] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ amount: '', txnId: '' });
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
        txnId: form.txnId,
      });
      setMessage('تم إرسال طلب الإيداع بنجاح. بانتظار موافقة الأدمن.');
      notify('تم إرسال طلب الإيداع بنجاح');
      setForm({ amount: '', txnId: '' });
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="deposit-wallet-box">
        <h3>
          <WalletIcon /> حوّل إلى محفظة USDT التالية (شبكة BEP-20)
        </h3>
        <p>بعد التحويل، انسخ رقم العملية (TxID) من محفظتك وأدخله بالأسفل لإرسال طلب الإيداع</p>
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
            <label>المبلغ المراد إيداعه ($)</label>
            <input type="number" min="1" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>رقم العملية (TxID) من محفظتك</label>
            <input value={form.txnId} onChange={(e) => setForm({ ...form, txnId: e.target.value })} placeholder="مثال: 0x1a2b3c4d..." required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'جارٍ الإرسال...' : 'إرسال طلب الإيداع'}
          </button>
        </form>
      </div>
    </div>
  );
}
