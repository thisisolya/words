import React from "react";
import Modal from "../components/modal";

interface ContextType {
  toggleModal: () => void;
  setAcceptButtonHandler?: React.Dispatch<React.SetStateAction<any>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const initialModalContextState = {
  toggleModal: () => false,
  setAcceptButtonHandler: () => {
    return null;
  },
  setText: () => "",
};

const ModalContext = React.createContext<ContextType>(initialModalContextState);

const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [acceptButtonHandler, setAcceptButtonHandler] = React.useState();
  const toggleModal = () => setOpen(!isOpen);

  return (
    <ModalContext.Provider
      value={{ toggleModal, setAcceptButtonHandler, setText }}
    >
      {children}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          toggleModal={toggleModal}
          text={text}
          acceptButtonHandler={acceptButtonHandler}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };
