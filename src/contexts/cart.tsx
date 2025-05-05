"use client";

import { post } from "@utils/fetch";
import { Maybe } from "@utils/types";
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

type Cart = {
  id: string;
  lines: {
    id: string;
    merchandise: {
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      product: {
        id: string;
        title: string;
        featuredImage: {
          src: string;
        };
      };
    };
    quantity: number;
  }[];
  totalQuantity: number;
  checkoutUrl: string;
};

const CartContext = createContext<Maybe<CartContext>>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({
    id: "",
    lines: [],
    totalQuantity: 0,
    checkoutUrl: "",
  });

  console.log("cart", cart);

  useEffect(() => {
    async function getCart() {
      const cartId = localStorage.getItem("cartId");

      if (cartId) {
        const cart = await post<Cart>("/api/get-cart", { cartId });
        setCart(cart);
      } else {
        const cart = await post<{ id: string; checkoutUrl: string }>(
          "/api/create-cart"
        );
        setCart({
          id: cart.id,
          lines: [],
          totalQuantity: 0,
          checkoutUrl: cart.checkoutUrl,
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
