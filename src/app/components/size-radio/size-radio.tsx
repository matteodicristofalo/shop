import styles from "./size-radio.module.scss";

type SizeRadioProps = {
  id: string;
  name: string;
  value: string;
  label: string;
};

export function SizeRadio({ id, name, value, label }: SizeRadioProps) {
  return (
    <div className={styles["size-radio"]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={styles["size-radio__input"]}
      />

      <label htmlFor={id} className={styles["size-radio__label"]}>
        {label}
      </label>
    </div>
  );
}
