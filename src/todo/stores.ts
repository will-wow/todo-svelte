import { writable, derived } from "svelte/store";
import { isError } from "result-async";
import _ from "lodash";

import { get, put } from "../api";
import * as Todo from "./todo";

export const todoMap = writable<Todo.Map>({});

export const todoList = derived(todoMap, Object.values);

export const loadTodos = async () => {
  const response = await get<Todo.List, string>("/");

  if (isError(response)) return null;

  const todoList = response.ok;
  const todoMapData = Todo.listToMap(todoList);

  todoMap.set(todoMapData);
};

export const updateTodo = <Key extends keyof Todo.T>(todo: Todo.T): void => {
  todoMap.update($todoMap => {
    return _.merge({}, $todoMap, { [todo.id]: todo });
  });
  put<Todo.T, string>(`/${todo.id}`, todo);
};

export const doneTodos = derived(todoList, $todoList =>
  _.filter($todoList, { done: false })
);

export const pendingTodos = derived(todoList, $todoList =>
  _.filter($todoList, { done: true })
);

export const areTodosDone = derived(
  doneTodos,
  $doneTodos => $doneTodos.length === 0
);
