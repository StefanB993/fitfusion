import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import styles from "./Sidebar.module.scss";
import { FaCalendar, FaDumbbell, FaHouse } from "react-icons/fa6";
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <Logo size={9} />
      </header>

      <ul className={styles.sidebar__menu}>
        <li>
          <NavLink to="home">
            <FaHouse size={21} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="workouts">
            <FaDumbbell size={21} /> Workouts
          </NavLink>
        </li>
        <li>
          <NavLink to="workout-calendar">
            <FaCalendar size={21} /> About
          </NavLink>
        </li>
        {/* <li>
          <LogoutTimer />
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;

// function LogoutTimer() {
//   const { timeRemaining } = useAutoLogout();

//   const totalSeconds = Math.floor(timeRemaining / 1000);
//   const minutes = Math.floor(totalSeconds / 60)
//     .toString()
//     .padStart(2, "0");
//   const seconds = Math.floor(totalSeconds % 60)
//     .toString()
//     .padStart(2, "0");

//   return (
//     <div>
//       <p>
//         Time remaining: {minutes} : {seconds}
//       </p>
//     </div>
//   );
// }
