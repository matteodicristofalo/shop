"use client";

import { post } from "@utils/fetch";
import { Maybe } from "@utils/types";
import { Cart } from "@models/cart";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContext = {
  cart: Cart;
  addToCart: (variantId: string) => Promise<void>;
};

const CartContext = createContext<Maybe<CartContext>>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({
    id: "",
    checkoutUrl: "",
    lines: [],
    totalQuantity: 0,
    totalAmount: {
      amount: "",
      currencyCode: "",
    },
  });

  useEffect(() => {
    async function getCart() {
      const cartId = localStorage.getItem("cartId");

      if (cartId) {
        const cart = await post<Cart>("/api/get-cart", { cartId });
        setCart(cart);
      } else {
        const cart = await post<Omit<Cart, "lines" | "totalQuantity">>(
          "/api/create-cart"
        );

        setCart({
          id: cart.id,
          checkoutUrl: cart.checkoutUrl,
          lines: [],
          totalQuantity: 0,
          totalAmount: cart.totalAmount,
        });

        localStorage.setItem("cartId", cart.id);
      }
    }

    getCart();
  }, []);

  const addToCart = useCallback(
    async (variantId: string) => {
      const newCart = await post<Cart>("/api/add-to-cart", {
        cartId: cart.id,
        variantId,
      });
      setCart(newCart);
    },
    [cart.id]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
    }),
    [cart, addToCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
