/* eslint-disable @next/next/no-img-element */
import { Button } from "../components/button/button";
import { SizeRadio } from "../components/size-radio/size-radio";
import styles from "./page.module.scss";

export default function ProductPage() {
  return (
    <div className={styles["product-page"]}>
      <div className={styles["product-page__media"]}>
        <img
          src="https://it.slamjam.com/cdn/shop/files/NewBalance-Footwear-Low-U990gr4Grey-U990GR4-20250203110752_01.jpg"
          alt="New Balance Made in USA 990v4"
          className={styles["product-page__media__image"]}
        />

        <img
          src="https://it.slamjam.com/cdn/shop/files/NewBalance-Footwear-Low-U990gr4Grey-U990GR4-20250203110752_01.jpg"
          alt="New Balance Made in USA 990v4"
          className={styles["product-page__media__image"]}
        />
      </div>

      <div>
        <div className={styles["product-page__information"]}>
          <p className={styles["product-page__information__brand"]}>
            New Balance
          </p>
          <p className={styles["product-page__information__name"]}>
            Made in USA 990v4
          </p>
          <p className={styles["product-page__information__price"]}>240 EUR</p>
        </div>

        <form className={styles["product-page__buy-area"]}>
          <fieldset className={styles["product-page__buy-area__size-selector"]}>
            <legend>Seleziona taglia</legend>

            <div
              className={styles["product-page__buy-area__size-selector__sizes"]}
            >
              <SizeRadio name="size" value="S" label="S" />
              <SizeRadio name="size" value="M" label="M" />
              <SizeRadio name="size" value="L" label="L" />
              <SizeRadio name="size" value="XL" label="XL" />
            </div>
          </fieldset>

          <Button type="submit" fluid>
            Aggiungi al carrello
          </Button>
        </form>
      </div>
    </div>
  );
}
