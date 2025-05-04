import { redirect } from "next/navigation";
import { getProductsInCategory } from "../../actions/categories";
import { ProductCard } from "@components/product-card/product-card";
import styles from "./page.module.scss";

export default async function CategoryPage() {
  const products = await getProductsInCategory();

  if (!products) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <h1 className={styles["category-page__title"]}>Sneakers</h1>

      <div className={styles["category-page__products"]}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            brand={product.brand}
            name={product.name}
            price={`${product.price.amount} ${product.price.currencyCode}`}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
