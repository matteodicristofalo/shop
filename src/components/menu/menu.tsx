import { getCategories } from "@utils/shopify/services/categories";
import { Drawer } from "@components/drawer/drawer";
import { NavigationItems } from "./navigation-items";
import styles from "./menu.module.scss";

export const MENU_DRAWER_ID = "menu";

export function Menu() {
  const categories = getCategories();

  return (
    <Drawer id={MENU_DRAWER_ID}>
      <div className={styles["menu"]}>
        <p className={styles["menu__title"]}>Menu</p>

        <nav className={styles["menu__navigation"]}>
          <NavigationItems categories={categories} />
        </nav>
      </div>
    </Drawer>
  );
}
