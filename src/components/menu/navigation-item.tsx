"use client";

import { MENU_DRAWER_ID } from "./menu";
import { closeDrawerEvent } from "@components/drawer/event";
import Link from "next/link";

type NavigationItemProps = {
  category: {
    id: string;
    name: string;
  };
};

export function NavigationItem({ category }: NavigationItemProps) {
  const closeDrawer = () => {
    const event = closeDrawerEvent(MENU_DRAWER_ID);
    document.dispatchEvent(event);
  };

  return (
    <Link href={`/categories/${category.id}`} onClick={closeDrawer}>
      {category.name}
    </Link>
  );
}
