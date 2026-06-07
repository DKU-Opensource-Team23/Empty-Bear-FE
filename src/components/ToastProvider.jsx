import { createContext, useContext, useMemo, useRef, useState } from "react";

const TOAST_DURATION = 3200;

const ToastContext = createContext(null);

const toastIcons = {
  success: "✓",
  error: "!",
  info: "i",
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutIdsRef = useRef(new Map());

  const dismissToast = (toastId) => {
    const timeoutId = timeoutIdsRef.current.get(toastId);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutIdsRef.current.delete(toastId);
    }

    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  };

  const showToast = (message, type = "info") => {
    if (!message) {
      return;
    }

    const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setToasts((prev) => [...prev, { id: toastId, message, type }]);

    const timeoutId = window.setTimeout(() => {
      dismissToast(toastId);
    }, TOAST_DURATION);

    timeoutIdsRef.current.set(toastId, timeoutId);
  };

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <div className="toast-content">
              <span className={`toast-icon toast-icon-${toast.type}`}>
                {toastIcons[toast.type] ?? toastIcons.info}
              </span>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button
              className="toast-close-button"
              onClick={() => dismissToast(toast.id)}
              aria-label="알림 닫기"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}

export default ToastProvider;
