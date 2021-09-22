import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import DeleteCompletedTodos from "./DeleteCompletedTodos";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
  deleteCompletedTodosRequest
} from "./thunks";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completedTodos,
  incompletedTodos,
  onRemovePressed,
  onCompletedPressed,
  onCleanPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete Todos</h3>
      {incompletedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed Todos</h3>
      <DeleteCompletedTodos todos={completedTodos} onCleanPressed={onCleanPressed}/>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompletedTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
  onCleanPressed: (todos) => dispatch(deleteCompletedTodosRequest(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
