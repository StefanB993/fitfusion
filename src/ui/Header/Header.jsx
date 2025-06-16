import { useAuth } from "../../context/AuthProvider";
import styles from "./Header.module.scss";
import { FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
function Header() {
  const {
    user: {
      user_metadata: { name, image },
    },
    signOut,
    isSigningOut,
  } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.header__user}>
        <img className={styles.header__userAvatar} src={image} />
        <div className={styles.header__userInfo}>
          <p className={styles.header__userName}>
            Welcome, <span>{name}</span>
          </p>
        </div>
      </div>
      <div className={styles.header__menu}>
        <Link to="update-user">
          <button>
            <FaUserEdit size="23" />
          </button>
        </Link>
        <button onClick={signOut} disabled={isSigningOut}>
          <MdLogout size="23" />
        </button>
      </div>
    </header>
  );
}

export default Header;
