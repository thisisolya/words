import React from "react";
import { Grid, Typography } from "@mui/material";
import store from "../../store";
import WordList from "../words/word-list";
import CreateUser from "./create-user";
import Container from "../../shared/container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setSelectedUser } from "../../store/slices/user-slice";
import { User } from "../../types/user";
import UserOptions from "./user-options";

type UserListProps = {
  selectedUser?: User;
  allUsers?: User[];
};

const UserList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { allUsers, selectedUser } = useSelector((state: any) => state.users);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId
      ? fetch(`http://localhost:8080/user`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify({ userId }),
        })
          .then((response) => response.json())
          .then((data) =>
            dispatch(
              setSelectedUser({
                firstName: data[0].first_name,
                lastName: data[0].last_name,
                id: data[0]._id,
              })
            )
          )
      : fetch("http://localhost:8080/", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
        })
          .then((response) => response.json())
          .then((data) =>
            dispatch(
              setAllUsers(
                data.map((user: any) => ({
                  firstName: user.first_name,
                  lastName: user.last_name,
                  id: user._id,
                }))
              )
            )
          );
  }, []);

  React.useEffect(() => {
    selectedUser && navigate(`/user/${selectedUser.id}`);
  }, [selectedUser]);

  const handleClick = (user: any) => {
    localStorage.setItem("userId", user.id);
    dispatch(setSelectedUser(user));
  };

  if (!allUsers && !selectedUser) {
    return <CreateUser />;
  }

  if (selectedUser) {
    return <UserOptions />;
  }

  return (
    <Container>
      <Typography variant="h2">Who's playing?</Typography>
      <Grid container gap="30px" justifyContent={"center"} m="20px 30px">
        {allUsers?.map((user: any) => (
          <Grid item onClick={() => handleClick(user)} key={user.id}>
            {user?.firstName} {user?.lastName}
          </Grid>
        ))}
      </Grid>
      <Link to="user/create">
        <Typography variant="h2">Create new user</Typography>
      </Link>
    </Container>
  );
};

export default UserList;
