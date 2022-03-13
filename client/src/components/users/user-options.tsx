import React from "react";
import styled from "@emotion/styled";
import Container from "../../shared/container";
import { Link } from "react-router-dom";
import store from "../../store";

const UserOptions = () => {
  const Card = styled("div")({
    padding: "15px",
  });

  const { id } = store.getState().users?.selectedUser!;
  if (!id) return null;
  return (
    <Container>
      <Card>
        <Link to="/">add word</Link>
      </Card>
      <Card>
        <Link to={`/cards/${id}`}>browse words</Link>
      </Card>
    </Container>
  );
};

export default UserOptions;
