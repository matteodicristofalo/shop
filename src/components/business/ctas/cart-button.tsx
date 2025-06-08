"use client";

import { CART_DRAWER_ID } from "@components/business/cart/cart-drawer";
import { openDrawerEvent } from "@components/ds/drawer/event";
import { useCartContext } from "@contexts/cart.context";

export function CartButton() {
  const { cart } = useCartContext();

  const openDrawer = () => {
    const event = openDrawerEvent(CART_DRAWER_ID);
    document.dispatchEvent(event);
  };

  return (
    <button type="button" onClick={openDrawer}>
      Carrello ({cart.totalQuantity})
    </button>
  );
}
