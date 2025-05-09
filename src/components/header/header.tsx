import { CartButton } from "@components/ctas/cart-button";
import { MenuButton } from "@components/ctas/menu-button";
import Link from "next/link";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]}>
        <Link href="/">Slam Jam</Link>
      </h1>

      <ul className={styles["header__ctas"]}>
        <li>
          <CartButton />
        </li>
        <li>
          <MenuButton />
        </li>
      </ul>
    </header>
  );
}
