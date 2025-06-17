import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./ConfirmEmail.module.scss";
import useConfirmEmail from "./useConfirmEmail";

function ConfirmEmail() {
  const { user } = useConfirmEmail();
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }
  // Add your code here

  const name = user.user_metadata.name;
  return (
    <div className={styles.confirmEmail}>
      <div className={styles.confirmEmail__container}>
        <header className={styles.confirmEmail__header}>
          <img
            className={styles.confirmEmail__logo}
            src="logo.png"
            alt="Logo"
          />
          <h1>
            Welcome, <span>{name}</span>
          </h1>
        </header>
        <div className={styles.confirmEmail__content}>
          <p className={styles.confirmEmail__message}>
            Thank you for confirming your email!
          </p>

          <Button action={handleLogin} type="submit">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
