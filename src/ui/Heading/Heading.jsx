import styles from "./Heading.module.scss";

function Heading({ type = "h1", children }) {
  return (
    <header className={styles.heading}>
      {type === "h1" && <h1 className={styles.heading__title}>{children}</h1>}
      {type === "h2" && <h2 className={styles.heading__title}>{children}</h2>}
    </header>
  );
}

export default Heading;
