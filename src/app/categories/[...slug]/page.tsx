import { redirect } from "next/navigation";
import { getCategory } from "@domain/services/categories.service";
import { getProductsInCategory } from "./data-fetching";
import { Breadcrumbs } from "@components/business/breadcrumbs/breadcrumbs";
import { ProductCard } from "@components/business/product-card/product-card";
import styles from "./page.module.scss";

type Params = Promise<{
  slug: string[];
}>;

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>) {
  const { slug } = await params;
  const lastCategoryLevelSlug = slug[slug.length - 1];

  const category = getCategory(lastCategoryLevelSlug);

  return {
    title: category?.name,
  };
}

export default async function CategoryPage({
  params,
}: Readonly<{ params: Params }>) {
  const { slug } = await params;
  const lastCategoryLevelSlug = slug[slug.length - 1];

  const category = getCategory(lastCategoryLevelSlug, { anchestors: true });
  if (!category) redirect("/404");

  const products = await getProductsInCategory(category.id);
  if (!products) redirect("/404");

  return (
    <div className={styles["category-page"]}>
      <div className={styles["category-page__breadcrumbs"]} title="breadcrumbs">
        <Breadcrumbs category={category} />
      </div>

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
