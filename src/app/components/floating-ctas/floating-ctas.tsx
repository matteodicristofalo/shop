import styles from "./floating-ctas.module.scss";

export function FloatingCTAs() {
  return (
    <div className={styles["floating-ctas"]}>
      <button type="button">Cart (0)</button>
      <button type="button">Menu</button>
    </div>
  );
}
