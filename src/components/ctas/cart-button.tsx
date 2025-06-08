"use client";

import { CART_DRAWER_ID } from "@components/cart/cart-drawer";
import { openDrawerEvent } from "@components/drawer/event";
import { useCartContext } from "@contexts/cart";

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
