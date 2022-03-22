import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";

interface IconButtonProps {
  disabled?: boolean;
  clickHandler: () => void;
  Icon: any;
}

const IconButton = ({
  disabled = false,
  clickHandler,
  Icon,
}: IconButtonProps) => {
  return (
    <MuiIconButton disabled={disabled} onClick={clickHandler}>
      <Icon color={disabled ? "disabled" : "primary"} size="small" />
    </MuiIconButton>
  );
};

export default IconButton;
