import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import Card from "../../shared/card";

import { setSelectedUser } from "../../store/slices/user-slice";
import { User } from "../../types/user";

const UserCard = ({ user }: { user: User }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(user);
    localStorage.setItem("userId", user.id);
    dispatch(setSelectedUser(user));
  };

  return (
    <Card key={user.id} size="small">
      <Button onClick={handleClick}>
        <Typography variant="body1">
          {user.firstName} {user.lastName}
        </Typography>
      </Button>
    </Card>
  );
};

export default UserCard;
