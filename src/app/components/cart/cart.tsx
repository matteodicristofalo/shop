import { Drawer } from "../drawer/drawer";
import { Button } from "../button/button";
import { ProductCard } from "../product-card/product-card";
import styles from "./cart.module.scss";

export const CART_DRAWER_ID = "cart";

export function Cart() {
  return (
    <Drawer id={CART_DRAWER_ID}>
      <div className={styles["cart"]}>
        <p className={styles["cart__title"]}>Carrello</p>

        <div className={styles["cart__items"]}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <div className={styles["cart__pay-button"]}>
          <Button type="button" fluid>
            <span className={styles["cart__pay-button__content"]}>
              <span>Vai al pagamento</span>
              <span>240 EUR</span>
            </span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
