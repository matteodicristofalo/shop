"use client";

import { useEffect, useState } from "react";
import { eventName } from "./event";
import clsx from "clsx";
import styles from "./drawer.module.scss";

type DrawerProps = {
  id: string;
  children: React.ReactNode;
};

export function Drawer({ id, children }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const event = eventName(id);
    const onOpenDrawer = () => setIsOpen(true);
    document.addEventListener(event, onOpenDrawer);
    return () => document.removeEventListener(event, onOpenDrawer);
  }, [id]);

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
