import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal';
import { modalSelector } from '../store/selectors/utility';
import { setModal } from '../store/slices/utility-slice';
import { Modal as ModalType } from '../types';

interface ContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleModal: () => any,
  acceptButtonHandler?: () => void,
  text: string,
}

const initialModalContextState = {
  toggleModal: () => false,
  acceptButtonHandler: undefined,
  text: '',
};

const ModalContext = React.createContext<ContextType>(initialModalContextState);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const modalInfo = useSelector(modalSelector) as ModalType;
  const { isOpen } = modalInfo;
  const toggleModal = () => dispatch(setModal({ isOpen: !isOpen }));
  const text = `You are going to ${modalInfo.action} the ${modalInfo.entity}, do you really want to do it?`;
  const acceptButtonHandler = modalInfo.acceptButtonHadler;

  const contextValue = React.useMemo(
    () => (
      { toggleModal, acceptButtonHandler, text }),
    [toggleModal, acceptButtonHandler, text],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          toggleModal={toggleModal}
          text={text}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acceptButtonHandler={acceptButtonHandler!}
        />
      )}
    </ModalContext.Provider>
  );
}

export default ModalContext;
export { ModalProvider };
