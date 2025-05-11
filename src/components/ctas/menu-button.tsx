"use client";

import { MENU_DRAWER_ID } from "@components/menu/menu";
import { openDrawerEvent } from "@components/drawer/event";

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
