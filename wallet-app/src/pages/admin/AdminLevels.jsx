import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useToast } from '../../context/ToastContext';

const EMPTY = { name: '', price: '', dailyVideos: '', rewardPerVideo: '' };

export default function AdminLevels() {
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.admin.levels().then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = {
        name: form.name,
        price: Number(form.price),
        dailyVideos: Number(form.dailyVideos),
        rewardPerVideo: Number(form.rewardPerVideo),
      };
      if (editing) {
        await api.admin.updateLevel(editing, data);
        notify('تم تحديث المستوى');
      } else {
        await api.admin.addLevel(data);
        notify('تمت إضافة المستوى');
      }
      setForm(EMPTY);
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    }
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      price: item.price,
      dailyVideos: item.daily_videos,
      rewardPerVideo: item.reward_per_video,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستوى؟')) return;
    try {
      await api.admin.deleteLevel(id);
      notify('تم حذف المستوى');
      load();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="card">
      <h2>{editing ? 'تعديل مستوى' : 'إضافة مستوى جديد'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={submit} className="inline-form">
        <div className="form-group">
          <label>اسم المستوى</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>السعر ($)</label>
          <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>فنادق يومياً</label>
          <input type="number" min="0" value={form.dailyVideos} onChange={(e) => setForm({ ...form, dailyVideos: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>مكافأة كل تقييم ($)</label>
          <input type="number" min="0" step="0.01" value={form.rewardPerVideo} onChange={(e) => setForm({ ...form, rewardPerVideo: e.target.value })} required />
        </div>
        <button className="btn-primary" type="submit">{editing ? 'حفظ التعديلات' : 'إضافة'}</button>
        {editing && (
          <button className="btn-gray" type="button" onClick={() => { setEditing(null); setForm(EMPTY); }}>
            إلغاء
          </button>
        )}
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>المستوى</th>
              <th>السعر</th>
              <th>فنادق يومياً</th>
              <th>مكافأة التقييم</th>
              <th>المكافأة اليومية</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}$</td>
                <td>{item.daily_videos}</td>
                <td>{item.reward_per_video}$</td>
                <td>{item.daily_videos * item.reward_per_video}$</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-gray btn-sm" onClick={() => startEdit(item)}>تعديل</button>
                    <button className="btn-red btn-sm" onClick={() => remove(item.id)}>حذف</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
