"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./accordion.module.scss";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export function Accordion({ title, children }: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleOpening = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={clsx(styles["accordion"], {
        [styles["accordion--expanded"]]: isExpanded,
      })}
    >
      <button
        type="button"
        className={styles["accordion__button"]}
        onClick={toggleOpening}
      >
        {title}
      </button>

      <div className={styles["accordion__content"]}>{children}</div>
    </div>
  );
}
