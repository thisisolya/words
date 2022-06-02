import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endsWith } from 'lodash';
import { alertSelector } from '../store/selectors/utility';
import { setAlert } from '../store/slices/utility-slice';
import { Alert } from '../types';
import Snackbar from '../components/Snackbar';

interface ContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleAlert: () => any,
  text: string,
  severity: string,
  isOpen: boolean,
}

const initialAlertContextState = {
  toggleAlert: () => false,
  text: '',
  severity: 'info',
  isOpen: false,
};

const AlertContext = React.createContext<ContextType>(initialAlertContextState);

function AlertProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const alertInfo = useSelector(alertSelector) as Alert;

  const { isOpen } = alertInfo;
  const positiveResult = alertInfo.result && alertInfo.result > 0;
  const verbInPastTense = endsWith('e', alertInfo.action) ? `${alertInfo.action}d` : `${alertInfo.action}ed`;
  const text = positiveResult
    ? `The ${alertInfo.entity} has been successfully ${verbInPastTense}`
    : `The ${alertInfo.entity} has not been ${verbInPastTense}`;
  const severity = positiveResult ? 'success' : 'error';

  const toggleAlert = () => dispatch(setAlert({ active: !isOpen }));

  const contextValue = React.useMemo(() => ({
    toggleAlert, text, severity, isOpen,
  }), [toggleAlert, text, severity, isOpen]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <Snackbar
          isOpen={isOpen}
          toggleAlert={toggleAlert}
          text={text}
          severity={severity}
        />
      )}
    </AlertContext.Provider>
  );
}

export default AlertContext;
export { AlertProvider };
