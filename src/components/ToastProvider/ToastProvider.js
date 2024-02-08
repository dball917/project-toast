import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [activeToasts, setActiveToasts] = React.useState([]);

  const addToast = React.useCallback(
    (variant, message) => {
      const id = crypto.randomUUID();
      const nextToasts = [{ id, variant, message }, ...activeToasts];
      setActiveToasts(nextToasts);
    },
    [activeToasts]
  );

  const removeToast = React.useCallback(
    (id) => {
      const nextToasts = activeToasts.filter((toast) => toast.id !== id);
      setActiveToasts(nextToasts);
    },
    [activeToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, activeToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;