import { getCategories } from "@utils/shopify/services/categories";
import { Drawer } from "@components/drawer/drawer";
import { NavigationItem } from "./navigation-item";
import styles from "./menu.module.scss";

export const MENU_DRAWER_ID = "menu";

export function Menu() {
  const categories = getCategories();

  return (
    <Drawer id={MENU_DRAWER_ID}>
      <nav className={styles["menu"]}>
        <p className={styles["menu__title"]}>Menu</p>

        <ul className={styles["menu__links"]}>
          {categories.map((category) => (
            <li key={category.id}>
              <NavigationItem category={category} />
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}
