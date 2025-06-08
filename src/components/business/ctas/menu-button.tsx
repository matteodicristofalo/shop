"use client";

import { MENU_DRAWER_ID } from "@components/business/menu/menu";
import { openDrawerEvent } from "@components/ds/drawer/event";

export function MenuButton() {
  const openDrawer = () => {
    const event = openDrawerEvent(MENU_DRAWER_ID);
    document.dispatchEvent(event);
  };

  return (
    <button type="button" onClick={openDrawer}>
      Menu
    </button>
  );
}
