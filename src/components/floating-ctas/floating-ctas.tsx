"use client";

import { openDrawerEvent } from "@components/drawer/event";
import { MENU_DRAWER_ID } from "@components/menu/menu";
import { CART_DRAWER_ID } from "@components/cart/cart";
import { Button } from "@components/button/button";
import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  const openDrawer = (id: string) => {
    const event = openDrawerEvent(id);
    document.dispatchEvent(event);
  };

  return (
    <div className={styles["floating-ctas"]}>
      <Button
        variant="secondary"
        type="button"
        onClick={() => openDrawer(CART_DRAWER_ID)}
      >
        Carrello (0)
      </Button>

      <Button
        variant="secondary"
        type="button"
        onClick={() => openDrawer(MENU_DRAWER_ID)}
      >
        Menu
      </Button>
    </div>
  );
}
