import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
function Button({ children, type, role, size, action = () => {} }) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={action}
      className={`${styles.btn} ${role ? styles[role] : ""} ${
        size ? styles[size] : ""
      } `}
    >
      {children}
    </button>
  );
}

export default Button;
