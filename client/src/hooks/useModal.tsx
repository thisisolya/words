import React from 'react';
import ModalContext from '../context/ModalContext';

const useModal = () => {
  const { toggleModal, setAcceptButtonHandler, setText } = React.useContext(ModalContext);

  const showModal = ({
    acceptFunction,
    text,
  }: {
    acceptFunction: () => void;
    text: string;
  }) => {
    toggleModal();
    setText(text);
    setAcceptButtonHandler(acceptFunction);
  };

  return { showModal };
};

export default useModal;
