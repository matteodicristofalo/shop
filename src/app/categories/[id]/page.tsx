import { redirect } from "next/navigation";
import { getProductsInCategory } from "./data-fetching";
import { ProductCard } from "@components/product-card/product-card";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function CategoryPage() {
  const products = await getProductsInCategory();

  if (!products) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <h1 className={styles["category-page__title"]}>Sneakers</h1>

      <div className={styles["category-page__products"]}>
        {products.map((product, index) => (
          <Link href={`/products/${product.id}`} key={index}>
            <ProductCard
              title={product.title}
              brand={product.brand}
              name={product.name}
              price={`${product.price.amount} ${product.price.currencyCode}`}
              image={product.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
