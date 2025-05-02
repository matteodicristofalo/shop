"use client";

import { openDrawerEvent } from "../drawer/event";
import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  const openMenu = () => {
    const event = openDrawerEvent();
    document.dispatchEvent(event);
  };

  return (
    <div className={styles["floating-ctas"]}>
      <button type="button">Carello (0)</button>
      <button type="button" onClick={openMenu}>
        Menu
      </button>
    </div>
  );
}
