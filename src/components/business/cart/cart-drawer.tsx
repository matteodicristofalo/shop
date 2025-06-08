"use client";

import { Drawer } from "@components/ds/drawer/drawer";
import { Button } from "@components/ds/button/button";
import { ProductCard } from "@components/business/product-card/product-card";
import { useCartContext } from "@contexts/cart.context";
import { redirect } from "next/navigation";
import styles from "./cart.module.scss";

export const CART_DRAWER_ID = "cart";

export default function CartDrawer() {
  return (
    <Drawer id={CART_DRAWER_ID}>
      <CartDrawerContent />
    </Drawer>
  );
}

function CartDrawerContent() {
  const { cart, removeFromCart } = useCartContext();

  return (
    <div className={styles["cart"]} data-testid="cart">
      <p className={styles["cart__title"]}>Carrello ({cart.totalQuantity})</p>

      {cart.lines.length > 0 ? (
        <>
          <ol className={styles["cart__items"]} title="cart items">
            {cart.lines.map((line, index) => {
              const { merchandise } = line;
              const { product } = merchandise;

              return (
                <li key={index} className={styles["cart__item"]}>
                  <ProductCard
                    id={product.id}
                    brand={product.brand}
                    name={product.name}
                    images={[product.image]}
                    price={merchandise.price}
                    size={merchandise.title}
                  />

                  <button
                    type="button"
                    className={styles["cart__item__remove-button"]}
                    onClick={() => removeFromCart(merchandise.id)}
                  >
                    Rimuovi
                  </button>
                </li>
              );
            })}
          </ol>

          <div className={styles["cart__pay-button"]}>
            <Button
              type="button"
              fluid
              onClick={() => redirect(cart.checkoutUrl)}
            >
              <span className={styles["cart__pay-button__content"]}>
                <span>Vai al pagamento</span>
                <span>
                  {cart.totalAmount.amount} {cart.totalAmount.currencyCode}
                </span>
              </span>
            </Button>
          </div>
        </>
      ) : (
        <p>Il tuo carrello è vuoto</p>
      )}
    </div>
  );
}
