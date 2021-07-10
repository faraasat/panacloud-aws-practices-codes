/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TodoInput = {
  id: string,
  title: string,
  done: boolean,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  title: string,
  done: boolean,
};

export type AddTodoMutationVariables = {
  todo?: TodoInput | null,
};

export type AddTodoMutation = {
  addTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    done: boolean,
  } | null,
};

export type UpdateTodoMutationVariables = {
  todo?: TodoInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    done: boolean,
  } | null,
};

export type DeleteTodoMutationVariables = {
  todoId?: string | null,
};

export type DeleteTodoMutation = {
  deleteTodo?: string | null,
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    id: string,
    title: string,
    done: boolean,
  } | null > | null,
};
