"use client";

import { useEffect, useState } from "react";
import { OPEN_DRAWER } from "./event";
import clsx from "clsx";
import styles from "./drawer.module.scss";

type DrawerProps = {
  children: React.ReactNode;
};

export function Drawer({ children }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpenDrawer = () => setIsOpen(true);
    document.addEventListener(OPEN_DRAWER, onOpenDrawer);
    return () => document.removeEventListener(OPEN_DRAWER, onOpenDrawer);
  }, []);

  return (
    <div
      className={clsx(styles["drawer"], { [styles["drawer--open"]]: isOpen })}
    >
      <div className={styles["drawer__content"]}>
        <button
          type="button"
          className={styles["drawer__close-button"]}
          onClick={() => setIsOpen(false)}
        >
          Chiudi
        </button>

        {children}
      </div>
    </div>
  );
}
