/* eslint-disable @next/next/no-img-element */
import { Price } from "@models/product";
import Link from "next/link";
import styles from "./product-card.module.scss";

type ProductCardProps = {
  id: string;
  brand: string;
  name: string;
  price: Price;
  images: string[];
  size?: string;
};

export function ProductCard({
  id,
  brand,
  name,
  price,
  images,
  size,
}: ProductCardProps) {
  const { amount, currencyCode } = price;

  return (
    <Link
      href={`/products/${id}`}
      aria-label={`${brand} ${name} ${amount} ${currencyCode}`}
    >
      <div className={styles["product-card"]}>
        <div className={styles["product-card__image"]}>
          {images.map((image) => (
            <img key={image} src={image} alt={`${brand} - ${name}`} />
          ))}
        </div>

        <div className={styles["product-card__information"]}>
          <p className={styles["product-card__brand"]}>{brand}</p>
          <p className={styles["product-card__name"]}>{name}</p>
          {size && <p className={styles["product-card__size"]}>{size}</p>}
          <p className={styles["product-card__price"]}>
            {amount} {currencyCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
