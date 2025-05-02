"use client";

import { openDrawerEvent } from "../drawer/event";
import styles from "./header.module.scss";

export function Header() {
  const openMenu = () => {
    const event = openDrawerEvent();
    document.dispatchEvent(event);
  };

  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]}>Slam Jam</h1>

      <ul className={styles["header__ctas"]}>
        <li>
          <button type="button">Carello (0)</button>
        </li>
        <li>
          <button type="button" onClick={openMenu}>
            Menu
          </button>
        </li>
      </ul>
    </header>
  );
}
