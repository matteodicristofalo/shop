/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles["home-page"]} data-header-variant="transparent">
      <img
        src="/cover.jpg"
        alt="New in cover"
        className={styles["home-page__new-in-cover"]}
      />

      <Link
        href="/collections/new-in"
        className={styles["home-page__new-in-cta"]}
      >
        Novità
      </Link>
    </div>
  );
}
