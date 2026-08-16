import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useToast } from '../../context/ToastContext';

export default function AdminUsers() {
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ username: '', balance: '', levelId: '' });
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.admin.users().then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    api.admin.levels().then(setLevels).catch(() => {});
  }, []);

  const startEdit = (item) => {
    setEditing(item);
    setForm({ username: item.username, balance: String(item.balance), levelId: item.level_id ? String(item.level_id) : '' });
    setError('');
  };

  const cancel = () => {
    setEditing(null);
    setForm({ username: '', balance: '', levelId: '' });
    setError('');
  };

  const save = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.admin.updateUser(editing.id, {
        username: form.username,
        balance: Number(form.balance),
        levelId: form.levelId ? Number(form.levelId) : null,
      });
      notify('تم تحديث بيانات المستخدم');
      cancel();
      load();
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="card">
      <h2>المستخدمون</h2>

      {editing && (
        <div className="modal-backdrop" onClick={cancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>تعديل المستخدم: {editing.username}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={save}>
              <div className="form-group">
                <label>اسم المستخدم</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>الرصيد ($)</label>
                <input type="number" min="0" step="0.01" value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>المستوى</label>
                <select value={form.levelId} onChange={(e) => setForm({ ...form, levelId: e.target.value })}>
                  <option value="">بدون مستوى</option>
                  {levels.map((lv) => (
                    <option key={lv.id} value={lv.id}>{lv.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" type="submit" disabled={saving}>
                  {saving ? 'جارٍ الحفظ...' : 'حفظ'}
                </button>
                <button className="btn-gray" type="button" onClick={cancel}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>اسم المستخدم</th>
              <th>المستوى</th>
              <th>الرصيد</th>
              <th>تاريخ التسجيل</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#6b7280' }}>لا يوجد مستخدمون</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.level_name || 'لا يوجد'}</td>
                <td>{item.balance}$</td>
                <td>{item.created_at}</td>
                <td>
                  <button className="btn-gray btn-sm" onClick={() => startEdit(item)}>تعديل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
