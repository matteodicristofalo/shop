import { redirect } from "next/navigation";
import { getCollection } from "./data-fetching";
import { ProductGrid } from "@components/business/product-grid/product-grid";
import styles from "./page.module.scss";

type Params = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>) {
  const { slug } = await params;
  const collection = await getCollection(slug);

  return {
    title: collection?.title,
  };
}

export default async function CategoryPage({
  params,
}: Readonly<{ params: Params }>) {
  const { slug } = await params;

  const collection = await getCollection(slug);
  if (!collection) redirect("/404");

  return (
    <div className={styles["collection-page"]}>
      <h1 className={styles["collection-page__title"]}>{collection.title}</h1>

      <ProductGrid products={collection.products} />
    </div>
  );
}
