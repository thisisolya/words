import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import Card from "../../shared/card";

import { setSelectedUser } from "../../store/slices/users-slice";
import { User } from "../../types/user";

const UserCard = ({ user }: { user: User }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.setItem("userId", user.id);
    dispatch(setSelectedUser(user));
  };

  return (
    <Card key={user.id} size="small">
      <Button onClick={handleClick}>
        {user.firstName} {user.lastName}
      </Button>
    </Card>
  );
};

export default UserCard;
