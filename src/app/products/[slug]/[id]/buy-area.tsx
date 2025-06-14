"use client";

import { useState } from "react";
import { Button } from "@components/ds/button/button";
import { SizeRadio } from "@components/business/size-radio/size-radio";
import { useCartContext } from "@contexts/cart.context";
import { Maybe } from "@utils/types.utils";
import { CART_DRAWER_ID } from "@components/business/cart/cart-drawer";
import { openDrawerEvent } from "@components/ds/drawer/event";
import { Variant } from "@domain/models/product.models";
import clsx from "clsx";
import styles from "./page.module.scss";

type BuyAreaProps = {
  availableForSale: boolean;
  variants: Variant[];
};

export function BuyArea({
  availableForSale,
  variants,
}: Readonly<BuyAreaProps>) {
  const { addToCart } = useCartContext();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isSingleSize = variants.length === 1;
  const initiallySelectedVariant = isSingleSize ? variants[0].id : undefined;
  const [selectedVariant, setSelectedVariant] = useState<Maybe<string>>(
    initiallySelectedVariant
  );

  const handleSubmit = async () => {
    if (!selectedVariant) {
      setError(true);
      return;
    }
    setError(false);
    setIsPending(true);
    await addToCart(selectedVariant);
    setIsPending(false);
    openCartDrawer();
  };

  const openCartDrawer = () => {
    const event = openDrawerEvent(CART_DRAWER_ID);
    document.dispatchEvent(event);
  };

  return (
    <form className={styles["product-page__buy-area"]}>
      {!isSingleSize && (
        <fieldset
          className={clsx(styles["product-page__buy-area__size-selector"])}
        >
          <legend>Seleziona taglia</legend>

          <div
            className={styles["product-page__buy-area__size-selector__sizes"]}
          >
            {variants.map((variant) => (
              <SizeRadio
                key={variant.id}
                name="size"
                value={variant.id}
                id={variant.id}
                label={variant.title}
                disabled={!variant.availableForSale}
                onChange={() => {
                  setSelectedVariant(variant.id);
                  setError(false);
                }}
              />
            ))}
          </div>
        </fieldset>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        fluid
        disabled={!availableForSale}
      >
        {!availableForSale
          ? "Sold out"
          : isPending
          ? "Cariamento..."
          : error
          ? "Seleziona taglia"
          : "Aggiungi al carrello"}
      </Button>
    </form>
  );
}
