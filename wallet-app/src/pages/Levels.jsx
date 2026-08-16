import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Levels() {
  const { user, refresh } = useAuth();
  const [levels, setLevels] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.levels.getAll().then(setLevels).catch(() => {});
  }, []);

  const purchase = async (levelId) => {
    setError('');
    setMessage('');
    try {
      await api.levels.purchase({ levelId });
      setMessage('تم تفعيل المستوى بنجاح');
      refresh().catch(() => {});
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <div className="grid-3">
        {levels.map((level) => {
          const current = user?.level_id === level.id;
          return (
            <div className={`level-card ${current ? 'current' : ''}`} key={level.id}>
              <div className="level-name">{level.name}</div>
              <div className="price">{level.price} ل.س</div>
              <p>فنادق يومياً: {level.daily_videos}</p>
              <p>مكافأة كل تقييم: {level.reward_per_video} ل.س</p>
              <p>المكافأة اليومية: {level.daily_videos * level.reward_per_video} ل.س</p>
              <div style={{ marginTop: 12 }}>
                {current ? (
                  <span className="status-approved" style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                    مشترك حالياً
                  </span>
                ) : (
                  <button className="btn-primary" onClick={() => purchase(level.id)}>
                    اشترِ الآن
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
