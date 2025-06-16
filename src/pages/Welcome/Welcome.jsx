import { NavLink, Outlet } from "react-router-dom";
import styles from "./Welcome.module.scss";
import useRedirectIfAuthenticated from "../../context/hooks/useRedirectIfAuthenticated";
import FullPageLoad from "../../components/FullPageLoad/FullPageLoad";
import Logo from "../../components/Logo/Logo";

function Welcome() {
  const { isPending } = useRedirectIfAuthenticated();
  console.log("Welcome");

  if (isPending) {
    return <FullPageLoad />;
  }

  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__header}>
        <Logo size={15} />
        <h1 className={styles.welcome__heading}>
          Fit<span>Fusion</span>
        </h1>
      </div>

      <div className={styles.welcome__nav}>
        <NavLink to="signup" className={styles.welcome__link}>
          Signup
        </NavLink>
        <NavLink to="login" className={styles.welcome__link}>
          Login
        </NavLink>
      </div>

      <Outlet />
    </main>
  );
}

export default Welcome;
