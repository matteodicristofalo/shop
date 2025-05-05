"use client";

import { Drawer } from "@components/drawer/drawer";
import { Button } from "@components/button/button";
import { ProductCard } from "@components/product-card/product-card";
import { useCartContext } from "@contexts/cart";
import styles from "./cart.module.scss";

export const CART_DRAWER_ID = "cart";

export function Cart() {
  const { cart } = useCartContext();

  return (
    <Drawer id={CART_DRAWER_ID}>
      <div className={styles["cart"]}>
        <p className={styles["cart__title"]}>Carrello</p>

        <div className={styles["cart__items"]}>
          {cart.lines.map((line, index) => {
            const { merchandise } = line;
            const { product } = merchandise;

            return (
              <ProductCard
                key={index}
                brand={product.brand}
                name={product.name}
                image={product.image}
                price={merchandise.price}
                size={merchandise.title}
              />
            );
          })}
        </div>

        <div className={styles["cart__pay-button"]}>
          <Button variant="primary" type="button" fluid>
            <span className={styles["cart__pay-button__content"]}>
              <span>Vai al pagamento</span>
              <span>
                {cart.totalAmount.amount} {cart.totalAmount.currencyCode}
              </span>
            </span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
