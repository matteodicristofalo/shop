"use client";

import styles from "./size-radio.module.scss";

type SizeRadioProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  disabled?: boolean;
  onChange?: () => void;
};

export function SizeRadio({
  id,
  name,
  value,
  label,
  disabled,
  onChange,
}: Readonly<SizeRadioProps>) {
  return (
    <div className={styles["size-radio"]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        className={styles["size-radio__input"]}
        onChange={onChange}
      />

      <label htmlFor={id} className={styles["size-radio__label"]}>
        {label}
      </label>
    </div>
  );
}
