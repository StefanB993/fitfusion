import { useContext, useState } from "react";
import { createContext } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState("");

  function openModalName(modalName) {
    setOpenModal(modalName);
  }

  function closeModal() {
    setOpenModal("");
  }

  return (
    <ModalContext.Provider value={{ openModal, openModalName, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
