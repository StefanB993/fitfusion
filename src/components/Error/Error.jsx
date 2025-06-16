import { MdError } from "react-icons/md";
import styles from "./Error.module.scss";
function Error({ message }) {
  return (
    <div className={styles.error}>
      <MdError size={50} color="#f9044c" />
      <h1>{message}.</h1>
    </div>
  );
}

export default Error;
