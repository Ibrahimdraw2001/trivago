import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

const MAX_TOASTS = 5;
let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = 'success') => {
      const id = ++toastId;
      setToasts((prev) => {
        const next = [...prev, { id, message, type }];
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
      });
      setTimeout(() => remove(id), 3500);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} onClick={() => remove(t.id)}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
