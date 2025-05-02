import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]}>Slam Jam</h1>

      <ul className={styles["header__ctas"]}>
        <li>
          <button>Cart (0)</button>
        </li>
        <li>
          <button>Menu</button>
        </li>
      </ul>
    </header>
  );
}
