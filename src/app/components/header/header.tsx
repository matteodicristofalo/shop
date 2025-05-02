import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]}>Slam Jam</h1>

      <ul className={styles["header__ctas"]}>
        <li>
          <button type="button">Cart (0)</button>
        </li>
        <li>
          <button type="button">Menu</button>
        </li>
      </ul>
    </header>
  );
}
