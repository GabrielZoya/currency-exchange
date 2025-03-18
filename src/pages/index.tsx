import Head from "next/head";
import styles from "../styles/Home.module.css";
import Exchange from "@/components/Exchange/Exchange";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Currency Exchange</title>
        <meta name="description" content="Currency exchange calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Exchange />
      </main>
    </div>
  );
}
