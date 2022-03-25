import React from 'react';
import { IconButton as MuiIconButton, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IconButtonProps {
  disabled?: boolean;
  clickHandler: () => void;
  Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & { muiName: string; };
}

function IconButton({
  disabled = false,
  clickHandler,
  Icon,
}: IconButtonProps) {
  return (
    <MuiIconButton disabled={disabled} onClick={clickHandler} size="small">
      <Icon color={disabled ? 'disabled' : 'primary'} size="small" />
    </MuiIconButton>
  );
}

export default IconButton;
