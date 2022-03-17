import { Stack, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

type objectToEdit = {
  value: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
};

const EditText = ({ objectsToEdit }: { objectsToEdit: objectToEdit[] }) => {
  return (
    <Stack marginX={2}>
      {objectsToEdit.map((object) => (
        <TextField
          key={uuidv4()}
          variant="standard"
          value={object.value}
          onChange={(e) => object.setNewValue(e.target.value)}
        />
      ))}
    </Stack>
  );
};

export default EditText;
