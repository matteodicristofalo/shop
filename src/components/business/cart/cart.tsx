"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./cart-drawer"), {
  ssr: false,
});

export function Cart() {
  return <CartDrawer />;
}
