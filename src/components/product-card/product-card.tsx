/* eslint-disable @next/next/no-img-element */
import styles from "./product-card.module.scss";

type ProductCardProps = {
  brand: string;
  name: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image: string;
  size?: string;
};

export function ProductCard({
  brand,
  name,
  price,
  image,
  size,
}: ProductCardProps) {
  return (
    <div className={styles["product-card"]}>
      <img
        src={image}
        alt={`${brand} - ${name}`}
        className={styles["product-card__image"]}
      />

      <div className={styles["product-card__information"]}>
        <p className={styles["product-card__brand"]}>{brand}</p>
        <p className={styles["product-card__name"]}>{name}</p>
        {size && <p className={styles["product-card__size"]}>{size}</p>}
        <p className={styles["product-card__price"]}>
          {price.amount} {price.currencyCode}
        </p>
      </div>
    </div>
  );
}
