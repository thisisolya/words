import React from "react";
import store from "../../store";
import WordList from "../words/word-list";
import CreateUser from "./create-user";

interface User {
  firstName: string;
  lastName: string;
}

function UserList() {
  const { allUsers, selectedUser } = store.getState().users;
  console.log(allUsers, selectedUser);

  if (!allUsers.length && !selectedUser.length) {
    return <CreateUser />;
  }

  if (selectedUser) {
    return <WordList />;
  }

  return (
    <>
      {allUsers.map((user: User) => (
        <div>
          ${user.firstName} ${user.lastName}
        </div>
      ))}
    </>
  );
}

export default UserList;
