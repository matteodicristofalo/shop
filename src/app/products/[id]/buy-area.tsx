"use client";

import { useActionState } from "react";
import { addToCart } from "./actions";
import { Button } from "@components/button/button";
import { SizeRadio } from "@components/size-radio/size-radio";
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
  const [error, action, isPending] = useActionState(addToCart, false);

  return (
    <form className={styles["product-page__buy-area"]} action={action}>
      <input type="text" name="cartId" defaultValue="12345" hidden />

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
            />
          ))}
        </div>
      </fieldset>

      <Button variant="primary" type="submit" fluid>
        {isPending ? "Cariamento..." : "Aggiungi al carrello"}
      </Button>
    </form>
  );
}
