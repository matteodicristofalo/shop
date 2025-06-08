import { Category } from "@domain/models/categories.models";
import { NavigationItem } from "./navigation-item";
import styles from "./menu.module.scss";

type NavigationItemsProps = {
  categories: Category[];
};

export function NavigationItems({
  categories,
}: Readonly<NavigationItemsProps>) {
  if (categories.length === 0) {
    return <></>;
  }

  return (
    <ul className={styles["menu__navigation__items"]}>
      {categories.map((category) => (
        <NavigationItem key={category.id} category={category} />
      ))}
    </ul>
  );
}
