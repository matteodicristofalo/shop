"use client";

import { openDrawerEvent } from "../drawer/event";
import { MENU_DRAWER_ID } from "../menu/menu";
import { CART_DRAWER_ID } from "../cart/cart";
import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  const openDrawer = (id: string) => {
    const event = openDrawerEvent(id);
    document.dispatchEvent(event);
  };

  return (
    <div className={styles["floating-ctas"]}>
      <button type="button" onClick={() => openDrawer(CART_DRAWER_ID)}>
        Carello (0)
      </button>
      <button type="button" onClick={() => openDrawer(MENU_DRAWER_ID)}>
        Menu
      </button>
    </div>
  );
}
