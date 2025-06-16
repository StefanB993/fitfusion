import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
import { FaAngleLeft } from "react-icons/fa6";

function BackButton({ to = -1 }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={`${styles.btn} ${styles.back}`}
    >
      <FaAngleLeft /> Back
    </button>
  );
}

export default BackButton;
