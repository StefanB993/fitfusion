import styles from "./Spinner.module.scss";

function Spinner({ size = "default" }) {
  const sizeClass = size === "small" ? styles["loader--small"] : "";

  return <span className={`${styles.loader} ${sizeClass}`}></span>;
}

export default Spinner;
