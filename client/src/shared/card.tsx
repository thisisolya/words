import { Stack } from "@mui/material";
import palette from "../theme/palette";

interface CardProps {
  children: any;
  size: "small" | "medium" | "large";
}

const style = {
  shared: {
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: `0 0 2px 0.1px ${palette.primary.main}`,
  },
  small: {
    justifyContent: "space-evenly",
    minHeight: "90px",
  },
  medium: {
    gap: "15px",
    margin: "10px 15px",
    maxWidth: "450px",
    padding: "20px 10px",
  },
  large: {
    gap: "15px",
    maxWidth: "600px",
    minHeight: "150px",
    minWidth: "250px",
    padding: "5px 10px",
  },
};

const Card = ({ children, size }: CardProps) => {
  const sharedStyled = style.shared;
  const customStyles = style[size];

  return <Stack style={{ ...sharedStyled, ...customStyles }}>{children}</Stack>;
};

export default Card;
