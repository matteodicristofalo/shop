/* eslint-disable @next/next/no-img-element */
import { Button } from "../../components/button/button";
import { SizeRadio } from "../../components/size-radio/size-radio";
import { Accordion } from "../../components/accordion/accordion";
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
              <SizeRadio name="size" value="S" id="s" label="S" />
              <SizeRadio name="size" value="M" id="m" label="M" />
              <SizeRadio name="size" value="L" id="l" label="L" />
              <SizeRadio name="size" value="XL" id="xl" label="XL" />
            </div>
          </fieldset>

          <Button variant="primary" type="submit" fluid>
            Aggiungi al carrello
          </Button>
        </form>

        <div className={styles["product-page__accordions"]}>
          <Accordion title="Descrizione articolo">
            Le New Balance 990 furono progettate per essere le migliori scarpe
            da corsa sul mercato e, fin dal loro lancio nel 1982, superarono le
            aspettative grazie al design elegante e al prezzo elevato,
            diventando un simbolo di qualità e stile sia per runner che per
            trendsetter. Nel tempo, la scarpa ha subito aggiornamenti estetici e
            funzionali, mantenendo però intatto il suo status iconico. La
            versione 990v4 del 2016 ha modernizzato la silhouette con materiali
            premium come mesh e suede di cinghiale e nuove soluzioni di
            ammortizzazione.
          </Accordion>

          <Accordion title="Spedizione e resi">
            La spedizione express con FedEx ha un costo di 10€ e richiede 1-2
            giorni lavorativi. È gratuita per ordini superiori a 200€. I prezzi
            includono IVA locale e non sono previsti dazi doganali. Hai 14
            giorni di tempo per effettuare un reso (con una trattenuta di 10€
            sul rimborso) o un cambio taglia (gratuito).
          </Accordion>
        </div>
      </div>
    </div>
  );
}
