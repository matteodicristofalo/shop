"use client";

import { CART_DRAWER_ID } from "@components/cart/cart";
import { Button } from "@components/button/button";
import { openDrawerEvent } from "@components/drawer/event";
import { useCartContext } from "@contexts/cart";

export function CartButton() {
  const { cart } = useCartContext();

  const openDrawer = () => {
    const event = openDrawerEvent(CART_DRAWER_ID);
    document.dispatchEvent(event);
  };

  return (
    <Button variant="secondary" type="button" onClick={openDrawer}>
      Carrello ({cart.totalQuantity})
    </Button>
  );
}
