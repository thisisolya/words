import React from "react";
import ModalContext from "../context/modal-context";

const useModal = () => {
  const { toggleModal, setAcceptButtonHandler, setText } =
    React.useContext(ModalContext);

  const showModal = ({
    acceptFunction,
    text,
  }: {
    acceptFunction: any;
    text: string;
  }) => {
    toggleModal();
    setText(text);
    setAcceptButtonHandler && setAcceptButtonHandler(acceptFunction);
  };

  return { showModal };
};

export default useModal;
