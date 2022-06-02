/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Alert, Modal } from '../../types';

interface InitialStateType {
  isLoading: boolean;
  alert: Alert,
  modal: Modal,
}

const initialState: InitialStateType = {
  isLoading: false,
  alert: {
    isOpen: false,
  },
  modal: {
    isOpen: false,
  },
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    setModal: (state, { payload }) => {
      state.alert = payload;
    },
  },
});

const { setIsLoading, setAlert, setModal } = utilitySlice.actions;
export { setIsLoading, setAlert, setModal };
export default utilitySlice;
