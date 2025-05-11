"use client";

import { Drawer } from "@components/drawer/drawer";
import { Button } from "@components/button/button";
import { ProductCard } from "@components/product-card/product-card";
import { useCartContext } from "@contexts/cart";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./cart.module.scss";

export const CART_DRAWER_ID = "cart";

export function Cart() {
  const { cart, removeFromCart } = useCartContext();

  return (
    <Drawer id={CART_DRAWER_ID}>
      <div className={styles["cart"]}>
        <p className={styles["cart__title"]}>Carrello ({cart.totalQuantity})</p>

        {cart.lines.length > 0 ? (
          <>
            <div className={styles["cart__items"]}>
              {cart.lines.map((line, index) => {
                const { merchandise } = line;
                const { product } = merchandise;

                return (
                  <div key={index} className={styles["cart__item"]}>
                    <Link href={`/products/${product.id}`}>
                      <ProductCard
                        brand={product.brand}
                        name={product.name}
                        images={[product.image]}
                        price={merchandise.price}
                        size={merchandise.title}
                      />
                    </Link>

                    <button
                      type="button"
                      className={styles["cart__item__remove-button"]}
                      onClick={() => removeFromCart(merchandise.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                );
              })}
            </div>

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
    </Drawer>
  );
}
