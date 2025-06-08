/* eslint-disable @next/next/no-img-element */
import { Price } from "@models/price";
import Link from "next/link";
import styles from "./product-card.module.scss";

type ProductCardProps = {
  id: string;
  brand: string;
  name: string;
  price: Price;
  discountedPrice?: Price;
  images: string[];
  size?: string;
};

export function ProductCard({
  id,
  brand,
  name,
  price,
  discountedPrice,
  images,
  size,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} aria-label={`${brand} ${name}`}>
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
            <span className={styles["product-card__price__original"]}>
              {`${price.amount} ${price.currencyCode}`}
            </span>

            {discountedPrice && (
              <span className={styles["product-card__price__discounted"]}>
                {`${discountedPrice.amount} ${discountedPrice.currencyCode}`}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
