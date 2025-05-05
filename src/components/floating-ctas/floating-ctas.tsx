import { CartButton } from "@components/ctas/cart-button";
import { MenuButton } from "@components/ctas/menu-button";
import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  return (
    <div className={styles["floating-ctas"]}>
      <CartButton />
      <MenuButton />
    </div>
  );
}
