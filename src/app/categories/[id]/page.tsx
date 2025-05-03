import { ProductCard } from "../../components/product-card/product-card";
import styles from "./page.module.scss";

export default function CategoryPage() {
  return (
    <div className={styles["category-page"]}>
      <h1 className={styles["category-page__title"]}>Abbigliamento</h1>

      <div className={styles["category-page__products"]}>
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
