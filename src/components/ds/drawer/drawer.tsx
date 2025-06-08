"use client";

import { useCallback, useEffect, useState } from "react";
import { closeEventName, openEventName } from "./event";
import clsx from "clsx";
import styles from "./drawer.module.scss";

type DrawerProps = {
  id: string;
  children: React.ReactNode;
};

export function Drawer({ id, children }: Readonly<DrawerProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("scroll-lock");
  }, [setIsOpen]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("scroll-lock");
  }, [setIsOpen]);

  useEffect(() => {
    const openEvent = openEventName(id);
    const closeEvent = closeEventName(id);

    document.addEventListener(openEvent, openDrawer);
    document.addEventListener(closeEvent, closeDrawer);

    return () => {
      document.removeEventListener(openEvent, openDrawer);
      document.removeEventListener(closeEvent, closeDrawer);
    };
  }, [id, openDrawer, closeDrawer]);

  return (
    <div
      className={clsx(styles["drawer"], { [styles["drawer--open"]]: isOpen })}
    >
      <div className={styles["drawer__content"]}>
        <div className={styles["drawer__close-button"]}>
          <button
            type="button"
            onClick={closeDrawer}
            data-testid={`close-${id}-drawer`}
          >
            Chiudi
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
