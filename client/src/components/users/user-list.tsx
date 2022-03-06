import React from "react";
import WordList from "../words/word-list";
import CreateUser from "./create-user";

interface User {
  firstName: string;
  lastName: string;
}

interface UserListProps {
  selectedUser?: User,
  allUsers: User[],
}

const UserList = ({allUsers, selectedUser}: UserListProps) => {
 
  if (!allUsers.length && !selectedUser) {
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
