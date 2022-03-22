import { Button } from "@mui/material";

interface ButtonProps {
  disabled?: boolean;
  clickHandler?: () => void;
  text: string;
  icon?: any;
}

const ButtonContained = ({
  disabled = false,
  clickHandler,
  text,
}: ButtonProps) => {
  return (
    <Button variant="contained" onClick={clickHandler} disabled={disabled}>
      {text}
    </Button>
  );
};

export default ButtonContained;
