import { writable, derived } from "svelte/store";
import { isError } from "result-async";
import _ from "lodash";

import { get } from "../api";
import * as Todo from "./todo";

export const { subscribe, set, update } = writable<Todo.List>([]);

export const todoList = {
  subscribe,
  load: async () => {
    const response = await get<Todo.List, string>("/");

    if (isError(response)) return null;

    const todoList = response.ok;

    set(todoList);
  }
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
