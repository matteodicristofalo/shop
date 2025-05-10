/* eslint-disable @next/next/no-img-element */
import { Accordion } from "@components/accordion/accordion";
import { BuyArea } from "./buy-area";
import { getProduct } from "./data-fetching";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

type Params = Promise<{
  id: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product?.title,
    description: product?.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) redirect("/404");

  return (
    <div className={styles["product-page"]}>
      <div className={styles["product-page__media"]}>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={product.title}
            className={styles["product-page__media__image"]}
          />
        ))}
      </div>

      <div>
        <div className={styles["product-page__information"]}>
          <p className={styles["product-page__information__brand"]}>
            {product.brand}
          </p>
          <p className={styles["product-page__information__name"]}>
            {product.name}
          </p>
          <p className={styles["product-page__information__price"]}>
            {product.price.amount} {product.price.currencyCode}
          </p>
        </div>

        <BuyArea variants={product.variants} />

        <div className={styles["product-page__accordions"]}>
          <Accordion title="Descrizione articolo" initiallyExpanded>
            {product.description}
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
