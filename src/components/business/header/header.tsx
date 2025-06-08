import { CartButton } from "@components/business/ctas/cart-button";
import { MenuButton } from "@components/business/ctas/menu-button";
import Link from "next/link";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__logo"]}>
        <Link href="/">Logo</Link>
      </div>

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
