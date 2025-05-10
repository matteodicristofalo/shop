import { redirect } from "next/navigation";
import { getCategory } from "./data-fetching";
import { ProductCard } from "@components/product-card/product-card";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <h1 className={styles["category-page__title"]}>{category.name}</h1>

      <div className={styles["category-page__products"]}>
        {category.products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard
              brand={product.brand}
              name={product.name}
              price={product.price}
              images={product.images}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
