import React from "react";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const Container = ({ children }: any) => {
  const Container = styled(Stack)({
    paddingTop: "10vh",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  });

  return <Container>{children}</Container>;
};

export default Container;
