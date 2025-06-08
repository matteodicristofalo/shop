"use client";

import { post } from "@utils/fetch.utils";
import { Maybe } from "@utils/types.utils";
import { Cart } from "@domain/models/cart.models";
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
  removeFromCart: (variantId: string) => Promise<void>;
};

const CartContext = createContext<Maybe<CartContext>>(undefined);

export function CartContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const createCart = useCallback(async () => {
    try {
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
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }, []);

  useEffect(() => {
    async function initializeCart() {
      const cartId = localStorage.getItem("cartId");

      if (cartId) {
        try {
          const cart = await post<Cart>("/api/get-cart", { cartId });
          setCart(cart);
        } catch (error) {
          console.error("Error fetching cart:", error);
          await createCart();
        }
      } else {
        await createCart();
      }
    }

    initializeCart();
  }, [createCart]);

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

  const removeFromCart = useCallback(
    async (variantId: string) => {
      const variantLines = cart.lines.filter(
        (line) => line.merchandise.id === variantId
      );
      const variantQuantity = variantLines.length;
      const lineId = variantLines.reduce((_, line) => line.id, "");
      const newCart = await post<Cart>("/api/remove-from-cart", {
        cartId: cart.id,
        lineId,
        variantId,
        quantity: variantQuantity - 1,
      });
      setCart(newCart);
    },
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
    }),
    [cart, addToCart, removeFromCart]
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
