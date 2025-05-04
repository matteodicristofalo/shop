/* eslint-disable @next/next/no-img-element */
import styles from "./product-card.module.scss";

type ProductCardProps = {
  title: string;
  brand: string;
  name: string;
  price: string;
  image: string;
};

export function ProductCard({
  title,
  brand,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className={styles["product-card"]}>
      <img src={image} alt={title} className={styles["product-card__image"]} />

      <div className={styles["product-card__information"]}>
        <p className={styles["product-card__brand"]}>{brand}</p>
        <p className={styles["product-card__name"]}>{name}</p>
        <p className={styles["product-card__price"]}>{price}</p>
      </div>
    </div>
  );
}
