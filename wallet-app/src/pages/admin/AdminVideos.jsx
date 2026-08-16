import { useEffect, useState } from 'react';
import { api } from '../../api';

const EMPTY = { name: '', city: '', image: '', description: '', active: 1 };

export default function AdminHotels() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.admin.hotels().then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await api.admin.updateHotel(editing, form);
      } else {
        await api.admin.addHotel(form);
      }
      setForm(EMPTY);
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, city: item.city, image: item.image, description: item.description, active: item.active });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الفندق؟')) return;
    await api.admin.deleteHotel(id).catch((err) => alert(err.message));
    load();
  };

  if (loading) return <div className="center-loading">جارٍ التحميل...</div>;

  return (
    <div className="card">
      <h2>{editing ? 'تعديل فندق' : 'إضافة فندق جديد'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={submit} className="inline-form">
        <div className="form-group">
          <label>اسم الفندق</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>المدينة</label>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="مثال: دمشق" />
        </div>
        <div className="form-group">
          <label>رابط الصورة</label>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>الوصف</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label>الحالة</label>
          <select value={form.active} onChange={(e) => setForm({ ...form, active: Number(e.target.value) })}>
            <option value={1}>نشط</option>
            <option value={0}>غير نشط</option>
          </select>
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
              <th>الفندق</th>
              <th>المدينة</th>
              <th>الوصف</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#6b7280' }}>لا توجد فنادق</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {item.image && <img src={item.image} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }} />}
                    {item.name}
                  </div>
                </td>
                <td>{item.city}</td>
                <td>{item.description}</td>
                <td>{item.active ? 'نشط' : 'غير نشط'}</td>
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
