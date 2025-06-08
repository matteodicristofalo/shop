import { redirect } from "next/navigation";
import { getCategory } from "@utils/shopify/services/categories";
import { getProductsInCategory } from "./data-fetching";
import { ProductCard } from "@components/product-card/product-card";
import Link from "next/link";
import styles from "./page.module.scss";

type Params = Promise<{
  id: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const category = getCategory(id);

  return {
    title: category?.name,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { id } = await params;

  const category = getCategory(id, { anchestors: true });
  if (!category) redirect("/404");

  const products = await getProductsInCategory(id);
  if (!products) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <nav className={styles["category-page__breadcrumbs"]} title="breadcrumbs">
        <ol>
          {category.anchestors?.map((ancestor) => (
            <li key={ancestor.id}>
              <Link href={`/categories/${ancestor.id}`}>{ancestor.name},</Link>
            </li>
          ))}

          <li>
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        </ol>
      </nav>

      <ol className={styles["category-page__grid"]} title="products grid">
        {products.map((product) => (
          <li key={product.id} className={styles["category-page__grid__item"]}>
            <ProductCard
              id={product.id}
              brand={product.brand}
              name={product.name}
              price={product.price.original}
              discountedPrice={product.price.discounted}
              images={product.images}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
