import { Drawer } from "../drawer/drawer";
import styles from "./cart.module.scss";

export const CART_DRAWER_ID = "cart";

export function Cart() {
  return (
    <Drawer id={CART_DRAWER_ID}>
      <div className={styles["cart"]}>
        <p className={styles["cart__title"]}>Carrello</p>
      </div>
    </Drawer>
  );
}
