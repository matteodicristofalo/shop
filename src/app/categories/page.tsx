import { ProductCard } from "../components/product-card/product-card";
import styles from "./page.module.scss";

export default function CategoriesPage() {
  return (
    <div className={styles["categories-page"]}>
      <h1 className={styles["categories-page__title"]}>Abbigliamento</h1>

      <div className={styles["categories-page__products"]}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
