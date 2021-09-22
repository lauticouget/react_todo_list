import React from "react";
import styled from "styled-components";

const DeleteCompletedTodosButton = styled.button`
  width: 100px;
  background-color: red;
  font-weight: bold;
  color: whitesmoke;
  border-radius: 5%;
  border-width: 5px;
  border-color: black;
  display: block;
  padding: 5px;
`;

const DeleteCompletedTodos = ({ todos ,onCleanPressed }) => (
  <DeleteCompletedTodosButton onClick={() => onCleanPressed(todos)}>
    Delete Completed
  </DeleteCompletedTodosButton>
);

export default DeleteCompletedTodos;
