"use client";

import { useEffect, useState } from "react";
import { eventName } from "./event";
import { Button } from "@components/button/button";
import clsx from "clsx";
import styles from "./drawer.module.scss";

type DrawerProps = {
  id: string;
  children: React.ReactNode;
};

export function Drawer({ id, children }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openDrawer = () => {
      setIsOpen(true);
      document.body.classList.add("scroll-lock");
    };

    const event = eventName(id);
    document.addEventListener(event, openDrawer);

    return () => document.removeEventListener(event, openDrawer);
  }, [id]);

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.classList.remove("scroll-lock");
  };

  return (
    <div
      className={clsx(styles["drawer"], { [styles["drawer--open"]]: isOpen })}
    >
      <div className={styles["drawer__content"]}>
        <div className={styles["drawer__close-button"]}>
          <Button variant="secondary" type="button" onClick={closeDrawer}>
            Chiudi
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
