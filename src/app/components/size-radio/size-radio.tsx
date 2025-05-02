import styles from "./size-radio.module.scss";

type SizeRadioProps = {
  name: string;
  value: string;
  label: string;
};

export function SizeRadio({ name, value, label }: SizeRadioProps) {
  return (
    <div className={styles["size-radio"]}>
      <input
        type="radio"
        name={name}
        value={value}
        className={styles["size-radio__input"]}
        aria-label={label}
      />

      <button
        type="button"
        className={styles["size-radio__button"]}
        tabIndex={-1}
        aria-hidden="true"
      >
        {label}
      </button>
    </div>
  );
}
