import React from "react";
import AlertContext from "../context/alert-context";

const useAlert = () => {
  const { toggleAlert, setText, setSeverity } = React.useContext(AlertContext);

  const showAlert = ({
    severity,
    text,
  }: {
    severity: "success" | "error" | "info" | "warning";
    text: string;
  }) => {
    toggleAlert();
    setText(text);
    setSeverity(severity);
  };

  return { showAlert };
};

export default useAlert;
