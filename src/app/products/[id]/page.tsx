/* eslint-disable @next/next/no-img-element */
import { Accordion } from "@components/ds/accordion/accordion";
import { BuyArea } from "./buy-area";
import { getProduct, getProductRecommendations } from "./data-fetching";
import { redirect } from "next/navigation";
import { ProductCard } from "@components/business/product-card/product-card";
import { extractFulfilledValueOrDefault } from "@utils/promise.utils";
import styles from "./page.module.scss";

type Params = Promise<{
  id: string;
}>;

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>) {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product?.title,
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: Readonly<{ params: Params }>) {
  const { id } = await params;

  const [productPromise, recommendationsPromise] = await Promise.allSettled([
    getProduct(id),
    getProductRecommendations(id),
  ]);

  const product = extractFulfilledValueOrDefault(productPromise, null);
  const recommendations = extractFulfilledValueOrDefault(
    recommendationsPromise,
    []
  );

  if (!product) redirect("/404");

  return (
    <div className={styles["product-page"]}>
      <div className={styles["product-page__grid"]}>
        <div
          className={styles["product-page__media"]}
          data-testid="product-media"
        >
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
            <h1 className={styles["product-page__information__title"]}>
              <span
                className={styles["product-page__information__title__brand"]}
                data-testid="product-brand"
              >
                {product.brand}
              </span>

              <span
                className={styles["product-page__information__title__name"]}
                data-testid="product-name"
              >
                {product.name}
              </span>
            </h1>

            <div className={styles["product-page__information__price"]}>
              <p
                className={styles["product-page__information__price__original"]}
                data-testid="product-price"
              >
                {`${product.price.original.amount} ${product.price.original.currencyCode}`}
              </p>

              {product.price.discounted && (
                <p
                  className={
                    styles["product-page__information__price__discounted"]
                  }
                  data-testid="product-discounted-price"
                >
                  {`${product.price.discounted.amount} ${product.price.discounted.currencyCode}`}
                </p>
              )}
            </div>
          </div>

          <BuyArea
            availableForSale={product.availableForSale}
            variants={product.variants}
          />

          <div className={styles["product-page__accordions"]}>
            <Accordion title="Descrizione articolo" initiallyExpanded>
              {product.description}
            </Accordion>

            <Accordion title="Spedizione e resi">
              La spedizione express con FedEx ha un costo di 10€ e richiede 1-2
              giorni lavorativi. È gratuita per ordini superiori a 200€. I
              prezzi includono IVA locale e non sono previsti dazi doganali. Hai
              14 giorni di tempo per effettuare un reso (con una trattenuta di
              10€ sul rimborso) o un cambio taglia (gratuito).
            </Accordion>
          </div>
        </div>
      </div>

      {recommendations && recommendations.length > 0 && (
        <div
          className={styles["product-page__recommendations"]}
          data-testid="product-recommendations"
        >
          <h2 className={styles["product-page__recommendations__title"]}>
            Prodotti consigliati
          </h2>

          <ol className={styles["product-page__recommendations__grid"]}>
            {recommendations.map((product) => (
              <li key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price.original}
                  discountedPrice={product.price.discounted}
                  images={product.images}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
