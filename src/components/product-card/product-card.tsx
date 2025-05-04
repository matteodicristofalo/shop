/* eslint-disable @next/next/no-img-element */
import styles from "./product-card.module.scss";

export function ProductCard() {
  return (
    <div className={styles["product-card"]}>
      <img
        src="https://it.slamjam.com/cdn/shop/files/NewBalance-Footwear-Low-U990gr4Grey-U990GR4-20250203110752_01.jpg"
        alt="New Balance Made in USA 990v4"
        className={styles["product-card__image"]}
      />

      <div className={styles["product-card__information"]}>
        <p className={styles["product-card__brand"]}>New Balance</p>
        <p className={styles["product-card__name"]}>Made in USA 990v4</p>
        <p className={styles["product-card__price"]}>240 EUR</p>
      </div>
    </div>
  );
}
