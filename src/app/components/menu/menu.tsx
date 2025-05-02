import { Drawer } from "../drawer/drawer";
import Link from "next/link";
import styles from "./menu.module.scss";

export const MENU_DRAWER_ID = "menu";

export function Menu() {
  return (
    <Drawer id={MENU_DRAWER_ID}>
      <nav className={styles["menu"]}>
        <p className={styles["menu__title"]}>Menu</p>

        <ul className={styles["menu__links"]}>
          <li>
            <Link href="#">Abbigliamento</Link>
          </li>
          <li>
            <Link href="#">Scarpe</Link>
          </li>
          <li>
            <Link href="#">Accessori</Link>
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}
