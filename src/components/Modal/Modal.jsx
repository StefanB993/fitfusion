import { useModal } from "../../context/ModalProvider";
import styles from "./Modal.module.scss";

function Modal({ children, modalId }) {
  const { openModal } = useModal();
  if (openModal !== modalId) {
    return null;
  }
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
