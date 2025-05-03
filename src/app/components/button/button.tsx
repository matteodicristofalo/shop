import { PrimaryButtonProps, SecondaryButtonProps } from "./types";
import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps;

export function Button({ children, ...props }: ButtonProps) {
  const variant = props.variant;
  const fluid = variant === "primary" && props.fluid === true;

  return (
    <button
      {...props}
      className={clsx(styles["button"], styles[`button--${variant}`], {
        [styles["button--fluid"]]: fluid,
      })}
    >
      {children}
    </button>
  );
}
