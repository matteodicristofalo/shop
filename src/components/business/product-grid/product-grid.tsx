import { PartialProduct } from "@domain/models/product.models";
import { ProductCard } from "../product-card/product-card";
import styles from "./product-grid.module.scss";

export function ProductGrid({ products }: { products: PartialProduct[] }) {
  return (
    <ol className={styles["product__grid"]} title="products grid">
      {products.map((product) => (
        <li key={product.id} className={styles["product__grid__item"]}>
          <ProductCard
            id={product.id}
            slug={product.slug}
            brand={product.brand}
            name={product.name}
            price={product.price.original}
            discountedPrice={product.price.discounted}
            images={product.images}
          />
        </li>
      ))}
    </ol>
  );
}
