import { Stack } from "@mui/material";
import palette from "../../theme/palette";

interface CardProps {
  children: any;
  size: "small" | "medium" | "large";
}

const style = {
  shared: {
    backgroundColor: palette.primary.light,
    borderRadius: "5px",
  },
  small: {
    boxShadow: `3px 3px 1px 0.1px ${palette.primary.main}`,
    justifyContent: "space-evenly",
    minHeight: "100px",
    minWidth: "90px",
  },
  medium: {
    boxShadow: `5px 5px 1px 2px ${palette.primary.main}`,
    gap: "15px",
    margin: "10px 15px",
    maxWidth: "450px",
    padding: "25px",
  },
  large: {
    boxShadow: `3px 3px 1px 1px ${palette.primary.main}`,
    gap: "15px",
    margin: "10px",
    minHeight: "150px",
    minWidth: "200px",
    padding: "5px 10px",
  },
};

const Card = ({ children, size }: CardProps) => {
  const sharedStyled = style.shared;
  const customStyles = style[size];

  return <Stack style={{ ...sharedStyled, ...customStyles }}>{children}</Stack>;
};

export default Card;
