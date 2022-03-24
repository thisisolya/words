import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../store/slice";

import { User } from "../types";

import Card from "./shared/card";

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
