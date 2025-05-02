/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.scss";

export default function ProductPage() {
  return (
    <div className={styles["product-page"]}>
      <div className={styles["product-page__carousel"]}>
        <img
          src="https://it.slamjam.com/cdn/shop/files/NewBalance-Footwear-Low-U990gr4Grey-U990GR4-20250203110752_01.jpg"
          alt="New Balance Made in USA 990v4"
          className={styles["product-page__carousel__image"]}
        />

        <img
          src="https://it.slamjam.com/cdn/shop/files/NewBalance-Footwear-Low-U990gr4Grey-U990GR4-20250203110752_01.jpg"
          alt="New Balance Made in USA 990v4"
          className={styles["product-page__carousel__image"]}
        />
      </div>

      <div className={styles["product-page__information"]}>
        <p className={styles["product-page__information__brand"]}>
          New Balance
        </p>
        <p className={styles["product-page__information__name"]}>
          Made in USA 990v4
        </p>
        <p className={styles["product-page__information__price"]}>240 EUR</p>
      </div>
    </div>
  );
}
