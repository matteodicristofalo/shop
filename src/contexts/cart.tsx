"use client";

import { createContext, useContext } from "react";

export type Cart = {
  id: string;
};

const CartContext = createContext<Cart | undefined>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = {
    id: "56789",
  };

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
