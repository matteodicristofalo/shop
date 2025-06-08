"use client";

import { MENU_DRAWER_ID } from "./menu";
import { closeDrawerEvent } from "@components/ds/drawer/event";
import { useState } from "react";
import { Category } from "@domain/models/categories.models";
import { NavigationItems } from "./navigation-items";
import Link from "next/link";
import styles from "./menu.module.scss";
import clsx from "clsx";

type NavigationItemProps = {
  category: Category;
};

export function NavigationItem({ category }: Readonly<NavigationItemProps>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const ancestorsSlugs = category.ancestors.map((a) => a.slug);
  const href = `/categories/${ancestorsSlugs.join("/")}/${category.slug}`;

  const closeDrawer = () => {
    const event = closeDrawerEvent(MENU_DRAWER_ID);
    document.dispatchEvent(event);
  };

  const onClick = (e: React.MouseEvent) => {
    const isLastNavigationLevel = !category.children;

    if (isLastNavigationLevel) {
      closeDrawer();
    } else {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <li
      className={clsx(styles["menu__navigation__item"], {
        [styles["menu__navigation__item--collapsed"]]: isCollapsed,
      })}
    >
      <Link href={href} onClick={onClick}>
        {category.name}
      </Link>

      {category.children && <NavigationItems categories={category.children} />}
    </li>
  );
}
