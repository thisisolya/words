import { IconButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";

interface CardToolbarProps {
  editingMode: boolean;
  handleCardDelete: () => void;
  handleCardEdit: () => void;
  handleModeChange: () => void;
}

const CardToolbar = ({
  editingMode,
  handleCardDelete,
  handleCardEdit,
  handleModeChange,
}: CardToolbarProps) => {
  if (editingMode) {
    return (
      <Stack direction="row" justifyContent="end">
        <IconButton onClick={handleCardEdit}>
          <CheckIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton onClick={handleModeChange}>
          <CloseOutlinedIcon fontSize="small" color="primary" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Stack direction="row" justifyContent="end">
      <IconButton onClick={handleCardDelete}>
        <DeleteOutlineIcon fontSize="small" color="primary" />
      </IconButton>
      <IconButton onClick={handleModeChange}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
    </Stack>
  );
};

export default CardToolbar;
