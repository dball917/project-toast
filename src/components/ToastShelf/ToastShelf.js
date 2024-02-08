import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { activeToasts, removeAllToasts } = React.useContext(ToastContext);

  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.code === "Escape") {
        removeAllToasts();
      }
    };

    addEventListener("keydown", handleEsc);
    return () => {
      removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {activeToasts.map(({ id, variant, message }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast id={id} variant={variant}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
