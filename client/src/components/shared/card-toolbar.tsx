import { Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "./icon-button";
import useModal from "../../hooks/use-modal";

interface CardToolbarProps {
  editingMode: boolean;
  handleCardDelete?: () => void;
  handleCardEdit: () => void;
  handleModeChange: () => void;
}

const CardToolbar = ({
  editingMode,
  handleCardDelete,
  handleCardEdit,
  handleModeChange,
}: CardToolbarProps) => {
  const { showModal } = useModal();
  // const handleDeleteCard = () => {
  //   showModal({
  //     text: " This is going to delete this card forever. There is no possibility to restore deleted cards",
  //     acceptFunction: () => handleCardDelete && handleCardDelete,
  //   });
  // };

  if (editingMode) {
    return (
      <Stack direction="row" justifyContent="end">
        <IconButton clickHandler={handleCardEdit} Icon={CheckIcon} />
        <IconButton clickHandler={handleModeChange} Icon={CloseOutlinedIcon} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" justifyContent="end">
      {handleCardDelete && (
        <IconButton
          clickHandler={() => handleCardDelete()}
          Icon={DeleteOutlineIcon}
        />
      )}
      <IconButton clickHandler={handleModeChange} Icon={EditIcon} />
    </Stack>
  );
};

export default CardToolbar;
