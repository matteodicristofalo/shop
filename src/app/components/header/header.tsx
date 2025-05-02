"use client";

import { openDrawerEvent } from "../drawer/event";
import { MENU_DRAWER_ID } from "../menu/menu";
import { CART_DRAWER_ID } from "../cart/cart";
import styles from "./header.module.scss";

export function Header() {
  const openDrawer = (id: string) => {
    const event = openDrawerEvent(id);
    document.dispatchEvent(event);
  };

  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]}>Slam Jam</h1>

      <ul className={styles["header__ctas"]}>
        <li>
          <button type="button" onClick={() => openDrawer(CART_DRAWER_ID)}>
            Carrello (0)
          </button>
        </li>
        <li>
          <button type="button" onClick={() => openDrawer(MENU_DRAWER_ID)}>
            Menu
          </button>
        </li>
      </ul>
    </header>
  );
}
