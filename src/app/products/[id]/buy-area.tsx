"use client";

import { useState } from "react";
import { Button } from "@components/button/button";
import { SizeRadio } from "@components/size-radio/size-radio";
import { useCartContext } from "../../../contexts/cart";
import { Maybe } from "@utils/types";
import clsx from "clsx";
import styles from "./page.module.scss";

type BuyAreaProps = {
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
  }[];
};

export function BuyArea({ variants }: BuyAreaProps) {
  const { addToCart } = useCartContext();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<Maybe<string>>(undefined);

  const handleSubmit = async () => {
    if (!selectedVariant) {
      setError(true);
      return;
    }
    setError(false);
    setIsPending(true);
    await addToCart(selectedVariant);
    setIsPending(false);
  };

  return (
    <form className={styles["product-page__buy-area"]}>
      <fieldset
        className={clsx(styles["product-page__buy-area__size-selector"], {
          [styles["product-page__buy-area__size-selector--error"]]: error,
        })}
      >
        <legend>Seleziona taglia</legend>

        <div className={styles["product-page__buy-area__size-selector__sizes"]}>
          {variants.map((variant) => (
            <SizeRadio
              key={variant.id}
              name="size"
              value={variant.id}
              id={variant.id}
              label={variant.title}
              disabled={!variant.availableForSale}
              onChange={() => setSelectedVariant(variant.id)}
            />
          ))}
        </div>
      </fieldset>

      <Button variant="primary" type="submit" onClick={handleSubmit} fluid>
        {isPending ? "Cariamento..." : "Aggiungi al carrello"}
      </Button>
    </form>
  );
}
