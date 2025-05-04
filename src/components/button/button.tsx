import { PrimaryButtonProps, SecondaryButtonProps } from "./types";
import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps;

export function Button({ variant, children, ...props }: ButtonProps) {
  const { fluid, ...buttonProps } = {
    fluid: false,
    ...props,
  };

  return (
    <button
      {...buttonProps}
      className={clsx(styles["button"], styles[`button--${variant}`], {
        [styles["button--fluid"]]: fluid,
      })}
    >
      {children}
    </button>
  );
}
