import { redirect } from "next/navigation";
import { getCategory } from "@utils/shopify/services/categories";
import { getCollection } from "./data-fetching";
import { ProductCard } from "@components/product-card/product-card";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = getCategory(id, { anchestors: true });
  if (!category) redirect("/404");

  const collection = await getCollection(id);
  if (!collection) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <h1 className={styles["category-page__title"]}>
        {category.anchestors?.map((ancestor) => (
          <Link key={ancestor.id} href={`/categories/${ancestor.id}`}>
            {ancestor.name},
          </Link>
        ))}

        <Link href={`/categories/${category.id}`}>{category.name}</Link>
      </h1>

      <ul className={styles["category-page__grid"]}>
        {collection.products.map((product) => (
          <li key={product.id} className={styles["category-page__grid__item"]}>
            <Link href={`/products/${product.id}`}>
              <ProductCard
                brand={product.brand}
                name={product.name}
                price={product.price}
                images={product.images}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
