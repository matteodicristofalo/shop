export type PrimaryButtonProps = ButtonCommonProps & {
  variant: "primary";
  fluid?: boolean;
};

export type SecondaryButtonProps = ButtonCommonProps & {
  variant: "secondary";
};

type ButtonCommonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};
