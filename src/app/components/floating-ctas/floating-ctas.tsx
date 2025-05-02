import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  return (
    <div className={styles["floating-ctas"]}>
      <button>Cart (0)</button>
      <button>Menu</button>
    </div>
  );
}
