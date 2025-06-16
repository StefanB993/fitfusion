import Spinner from "../Spinner/Spinner";
import styles from "./FullPageLoad.module.scss";
function FullPageLoad() {
  return (
    <div className={styles.fullPageLoad}>
      <Spinner />
    </div>
  );
}

export default FullPageLoad;
