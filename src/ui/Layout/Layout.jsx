import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import ModalProvider from "../../context/ModalProvider";
function Layout() {
  return (
    <div className={styles.layout}>
      <ModalProvider>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </ModalProvider>
    </div>
  );
}

export default Layout;
