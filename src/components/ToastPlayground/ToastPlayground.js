import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import Toast from "../Toast/Toast";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [selectedVariant, setSelectedVariant] = React.useState("notice");
  const [toastMessage, setToastMessage] = React.useState();
  const [activeToasts, setActiveToasts] = React.useState([]);

  function addToast(variant, message) {
    const id = crypto.randomUUID();
    const nextToasts = [{ id, variant, message }, ...activeToasts];
    setActiveToasts(nextToasts);
  }

  function removeToast(id) {
    const nextToasts = activeToasts.filter((toast) => toast.id !== id);
    setActiveToasts(nextToasts);
  }

  function submitToastForm(evt) {
    evt.preventDefault();
    addToast(selectedVariant, toastMessage);
    setToastMessage("");
    setSelectedVariant("notice");
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf
        activeToasts={activeToasts}
        onDeactivateToast={(id) => removeToast(id)}
      ></ToastShelf>

      <form onSubmit={submitToastForm}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={toastMessage}
                onChange={(evt) => setToastMessage(evt.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variant) => (
                <label htmlFor={`variant-${variant}`} key={variant}>
                  <input
                    id={`variant-${variant}`}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={(event) => setSelectedVariant(event.target.value)}
                  />
                  {variant}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
