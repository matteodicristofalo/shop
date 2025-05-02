import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  fluid?: boolean;
};

export function Button({ children, fluid, ...props }: ButtonProps) {
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
