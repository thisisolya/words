import React from 'react';
import Modal from '../components/modal';

interface ContextType {
  toggleModal: () => void;
  setAcceptButtonHandler: React.Dispatch<React.SetStateAction<() => void>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const initialModalContextState = {
  toggleModal: () => false,
  setAcceptButtonHandler: () => null,
  setText: () => '',
};

const ModalContext = React.createContext<ContextType>(initialModalContextState);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [acceptButtonHandler, setAcceptButtonHandler] = React.useState<() => void>(() => null);
  const toggleModal = () => setOpen(!isOpen);

  const contextValue = React.useMemo(
    () => (
      { toggleModal, setAcceptButtonHandler, setText }),
    [toggleModal, setAcceptButtonHandler, setText],
  );

  return (
    <ModalContext.Provider value={contextValue}>
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
}

export default ModalContext;
export { ModalProvider };
