import React from "react";
import styled from "@emotion/styled";
import Container from "../../shared/container";
import { Link } from "react-router-dom";
import store from "../../store";
import { useSelector } from "react-redux";

const UserOptions = () => {
  const Card = styled("div")({
    padding: "15px",
  });

  const userIid = useSelector((state: any) => state.users.selectedUser?.id);
  if (!userIid) return null;
  return (
    <Container>
      <Card>
        <Link to="/cards/add">add word</Link>
      </Card>
      <Card>
        <Link to={`/cards/${userIid}`}>browse words</Link>
      </Card>
    </Container>
  );
};

export default UserOptions;
