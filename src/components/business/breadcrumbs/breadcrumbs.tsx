import { Category } from "@domain/models/categories.models";
import Link from "next/link";

type BreadcrumbsProps = {
  category: Category;
};

export function Breadcrumbs({ category }: Readonly<BreadcrumbsProps>) {
  const ancestorsSlugs = category.ancestors.map((ancestor) => ancestor.slug);
  const href = `/categories/${ancestorsSlugs.join("/")}/${category.slug}`;

  return (
    <nav>
      <ol>
        {category.ancestors?.map((ancestor, i) => {
          const pathSegments = ancestorsSlugs.slice(0, i + 1);
          const href = `/categories/${pathSegments.join("/")}`;

          return (
            <li key={i}>
              <Link href={href}>{ancestor.name},</Link>
            </li>
          );
        })}

        <li>
          <Link href={href}>{category.name}</Link>
        </li>
      </ol>
    </nav>
  );
}
