import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fluid?: boolean;
  children: React.ReactNode;
};

export function Button({ fluid, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(styles["button"], {
        [styles["button--fluid"]]: fluid,
      })}
    >
      {children}
    </button>
  );
}
