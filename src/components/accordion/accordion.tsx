"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./accordion.module.scss";

type AccordionProps = {
  title: string;
  initiallyExpanded?: boolean;
  children: React.ReactNode;
};

export function Accordion({
  title,
  initiallyExpanded = false,
  children,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

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
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        <span aria-hidden="true">▲</span>
      </button>

      <div className={styles["accordion__content"]}>
        <div className={styles["accordion__content__wrapper"]}>{children}</div>
      </div>
    </div>
  );
}
