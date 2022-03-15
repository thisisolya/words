import React from "react";
import { Stack } from "@mui/material";
import theme from "../theme";

interface ContainerProps {
  children: any;
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "space-evenly"
    | "space-between";
}

const Container = ({ children, direction, justifyContent }: ContainerProps) => {
  const flexDirection = direction ? direction : "column";
  const containerStyle = {
    display: "flex",
    paddingTop: "10vh",
    alignItems: "center",
    justifyContent,
    gap: "10px",
    flexDirection,
    minHeight: "100vh",
    height: "100%",
    backgroundColor: theme.palette.secondary.light,
  };

  return <Stack sx={containerStyle}>{children}</Stack>;
};

export default Container;
