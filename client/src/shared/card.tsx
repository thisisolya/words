import { Stack } from "@mui/material";
import theme from "../theme";

interface CardProps {
  children: any;
  size: "small" | "medium" | "large";
}

const style = {
  shared: {
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: `5px 5px 5px 1px ${theme.palette.primary.dark}`,
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
