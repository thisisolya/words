import { Stack, TextField } from "@mui/material";

type objectToEdit = {
  value: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
};

const EditText = ({ objectsToEdit }: { objectsToEdit: objectToEdit[] }) => {
  return (
    <Stack marginX={2}>
      {objectsToEdit.map((object, index) => (
        <TextField
          key={index}
          variant="standard"
          value={object.value}
          onChange={(e) => object.setNewValue(e.target.value)}
        />
      ))}
    </Stack>
  );
};

export default EditText;
