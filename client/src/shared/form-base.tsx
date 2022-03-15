import React from "react";
import { Stack } from "@mui/material";
import theme from "../theme";

const FormBase = ({ children }: any) => {
  const formBaseStyle = {
    width: "85%",
    maxWidth: "450px",
    padding: "10px",
    margin: "15px",
    borderRadius: "5px",
    gap: "15px",
    boxShadow: `5px 5px 10px 10px ${theme.palette.secondary.main}`,
    backgroundColor: "white",
  };
  return (
    <Stack justifyContent="stretch" flexDirection="column" sx={formBaseStyle}>
      {children}
    </Stack>
  );
};

export default FormBase;
