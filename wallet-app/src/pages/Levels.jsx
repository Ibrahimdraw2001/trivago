import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../api';

export default function Levels() {
  const { user, refresh } = useAuth();
  const { notify } = useToast();
  const [levels, setLevels] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    api.levels.getAll().then(setLevels).catch(() => {});
  }, []);

  const purchase = async (levelId) => {
    setError('');
    setMessage('');
    setPurchasing(levelId);
    try {
      await api.levels.purchase({ levelId });
      setMessage('تم تفعيل المستوى بنجاح');
      notify('تم تفعيل المستوى بنجاح');
      refresh().catch(() => {});
    } catch (err) {
      setError(err.message);
      notify(err.message, 'error');
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <div className="grid-3">
        {levels.map((level) => {
          const current = user?.level_id === level.id;
          const currentLevelObj = levels.find((l) => l.id === user?.level_id);
          const locked = currentLevelObj && currentLevelObj.price >= level.price && !current;
          return (
            <div className={`level-card ${current ? 'current' : ''} ${locked ? 'locked' : ''}`} key={level.id}>
              <div className="level-name">{level.name}</div>
              <div className="price">{level.price}$</div>
              <p>فنادق يومياً: {level.daily_videos}</p>
              <p>مكافأة كل تقييم: {level.reward_per_video}$</p>
              <p>المكافأة اليومية: {level.daily_videos * level.reward_per_video}$</p>
              <div style={{ marginTop: 12 }}>
                {current ? (
                  <span className="status-approved" style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                    مشترك حالياً
                  </span>
                ) : locked ? (
                  <span style={{ display: 'block', textAlign: 'center', padding: '10px', color: '#6b7280', fontSize: 13 }}>
                    تجاوزت هذا المستوى
                  </span>
                ) : (
                  <button className="btn-primary" onClick={() => purchase(level.id)} disabled={purchasing === level.id}>
                    {purchasing === level.id ? 'جارٍ الشراء...' : 'اشترِ الآن'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
