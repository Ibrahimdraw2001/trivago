import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../api';
import { HotelIcon, MapPinIcon, StarIcon } from '../components/icons';

export default function Tasks() {
  const { refresh } = useAuth();
  const { notify } = useToast();
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState({});
  const [error, setError] = useState('');
  const [loadingRate, setLoadingRate] = useState(false);
  const [confirmHotel, setConfirmHotel] = useState(null);
  const [cities, setCities] = useState([]);
  const [filterCity, setFilterCity] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const load = () => {
    api.tasks.today().then(setData).catch(() => {});
  };

  useEffect(() => {
    load();
    api.tasksCities().then((res) => setCities(res)).catch(() => {});
  }, []);

  const rate = async (hotelId) => {
    if (selected[hotelId] === undefined) return;
    setError('');
    setLoadingRate(true);
    try {
      const result = await api.tasks.rate({ hotelId, stars: selected[hotelId] });
      notify(`تم تقييم الفندق وحصلت على ${result.reward}$`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      refresh().catch(() => {});
      load();
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setLoadingRate(false);
    }
  };

  if (!data) return <div className="center-loading">جارٍ التحميل...</div>;

  if (!data.hasLevel) {
    return (
      <div className="m-card" style={{ textAlign: 'center', padding: 30 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🏨</div>
        <h2 style={{ fontSize: 17, marginBottom: 8 }}>لم تشترك بأي مستوى بعد</h2>
        <p style={{ color: '#9aa3b2', fontSize: 13, marginBottom: 18 }}>
          اشترك بأحد المستويات لتبدأ بتقييم الفنادق والحصول على المكافآت.
        </p>
        <a href="/levels" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '12px 28px', color: '#fff' }}>
          عرض المستويات
        </a>
      </div>
    );
  }

  const percent = Math.min(100, (data.ratedCount / data.dailyLimit) * 100);

  return (
    <div>
      <div className="progress-card">
        <div className="progress-info">
          <span>{data.levelName}</span>
          <span>
            تقييمات اليوم: {data.ratedCount} / {data.dailyLimit}
          </span>
        </div>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${percent}%` }} />
        </div>
        <p style={{ color: '#9aa3b2', fontSize: 12 }}>مكافأة كل تقييم: {data.rewardPerHotel}$</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showSuccess && (
        <div className="success-flash">
          <span className="success-check">✅</span>
        </div>
      )}

      {data.hotels.length > 0 && cities.length > 0 && (
        <div className="hotel-filters">
          <select value={filterCountry} onChange={(e) => { setFilterCountry(e.target.value); setFilterCity(''); }}>
            <option value="">جميع الدول</option>
            {[...new Set(cities.map(c => c.country))].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="">جميع المدن</option>
            {cities
              .filter(c => !filterCountry || c.country === filterCountry)
              .map(c => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
          </select>
        </div>
      )}

      {data.hotels.length === 0 ? (
        <div className="m-card all-done-card" style={{ textAlign: 'center', padding: 30 }}>
          <div className="all-done-icon">🎉</div>
          <h3 style={{ fontSize: 17, marginBottom: 8 }}>
            {data.ratedCount >= data.dailyLimit
              ? 'أحسنت! أكملت تقييمات اليوم'
              : 'لا توجد فنادق متاحة حالياً'}
          </h3>
          <p style={{ color: '#9aa3b2', fontSize: 13 }}>
            {data.ratedCount >= data.dailyLimit
              ? 'عُد غداً لتكسب المزيد من المكافآت على فنادق جديدة.'
              : 'يرجى مراجعة الأدمن لاحقاً أو ترقية مستواك لتقييم فنادق إضافية.'}
          </p>
          {data.ratedCount >= data.dailyLimit && (
            <div className="all-done-reward">
              مكافآت اليوم: <strong>{(data.ratedCount * data.rewardPerHotel).toFixed(2)}$</strong>
            </div>
          )}
        </div>
      ) : (
        data.hotels
          .filter(h => !filterCountry || h.country === filterCountry)
          .filter(h => !filterCity || h.city === filterCity)
          .map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <div className={`hotel-img ${hotel.image ? 'has-img' : ''}`}>
              <div className="hotel-cover">
                <span className="hotel-cover-icon">🏨</span>
                <span className="hotel-cover-name">{hotel.name}</span>
                <span className="hotel-cover-city">{hotel.city} · {hotel.country}</span>
              </div>
              {hotel.image && (
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
            <div className="hotel-body">
              <div className="hotel-head">
                <div className="hotel-title">
                  <h4>{hotel.name}</h4>
                  <span className="hotel-city">
                    <MapPinIcon /> {hotel.city} · {hotel.country}
                  </span>
                </div>
                {hotel.rating_count > 0 && (
                  <div className="hotel-rating">
                    <span>{hotel.avg_rating}</span>
                    <small>{hotel.avg_rating >= 8 ? 'ممتاز' : hotel.avg_rating >= 6 ? 'جيد جداً' : 'جيد'}</small>
                  </div>
                )}
              </div>
              {hotel.description && <p className="hotel-desc">{hotel.description}</p>}
              <div className="stars-row">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${selected[hotel.id] === star ? 'selected' : ''}`}
                    onClick={() => setSelected({ ...selected, [hotel.id]: star })}
                  >
                    <StarIcon size={16} /> {star}
                  </button>
                ))}
              </div>
              <button
                className="btn-green"
                type="button"
                disabled={loadingRate || selected[hotel.id] === undefined}
                onClick={() => setConfirmHotel(hotel)}
              >
                تقييم الفندق وإرسال
              </button>
            </div>
          </div>
        ))
      )}
      {confirmHotel && (
        <div className="modal-backdrop" onClick={() => setConfirmHotel(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>تأكيد التقييم</h3>
            <p style={{ margin: '12px 0', color: '#9aa3b2' }}>
              هل أنت متأكد من تقييم فندق <strong style={{ color: '#fff' }}>{confirmHotel.name}</strong> بـ <strong style={{ color: '#16a34a' }}>{selected[confirmHotel.id]}/10</strong> نجوم؟
            </p>
            <p style={{ fontSize: 12, color: '#6b7280' }}>لا يمكنك التراجع عن هذا التقييم.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn-green" disabled={loadingRate} onClick={() => { rate(confirmHotel.id); setConfirmHotel(null); }}>
                {loadingRate ? 'جارٍ الإرسال...' : 'تأكيد'}
              </button>
              <button className="btn-gray" onClick={() => setConfirmHotel(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
