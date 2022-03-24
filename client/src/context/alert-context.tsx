import React from "react";
import Snackbar from "../components/snackbar";

interface ContextType {
  toggleAlert: () => void;

  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error" | "info" | "warning">
  >;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const initialAlertContextState = {
  toggleAlert: () => false,

  setSeverity: () => "info",
  setText: () => "",
};

const AlertContext = React.createContext<ContextType>(initialAlertContextState);

const AlertProvider = ({ children }: { children: any }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [severity, setSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const toggleAlert = () => setOpen(!isOpen);

  return (
    <AlertContext.Provider value={{ toggleAlert, setSeverity, setText }}>
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
};

export default AlertContext;
export { AlertProvider };
