import { v4 as uuid } from "uuid";
import { sortBy } from "lodash";
import { map, pipe, fromPairs, reject, isNil } from "lodash/fp";

interface NewTodo {
  id: string;
  uuid: string;
  title: string;
  done: boolean;
  createdAt: string | null;
}

interface SavedTodo {
  id: number | "";
  uuid?: string;
  title: string;
  done: boolean;
  createdAt: string | null;
}

type Todo = NewTodo | SavedTodo;

type TodoList = Todo[];
interface TodoMap {
  [id: string]: Todo;
}

export type T = Todo;
export type List = TodoList;
export type Map = TodoMap;

export const listToMap = (list: TodoList): TodoMap => {
  return pipe(
    map((todo: Todo) => [key(todo), todo]),
    fromPairs
  )(list);
};

export const mapToList = (map: TodoMap): TodoList => {
  return pipe(
    Object.values,
    reject(isNil),
    todoList => sortBy(todoList, ["done", "createdAt"])
  )(map);
};

export const isNew = (todo: Todo): todo is NewTodo => {
  return todo.id === -1;
};

export const toApi = (todo: Todo): SavedTodo => {
  const { id, ...json } = todo;

  const apiId = (id === -1 ? "" : id) as number | "";

  return { ...json, id: apiId };
};

export const key = (todo: Todo): string | number => todo.uuid || todo.id;

export const build = (title: string = "") => {
  return {
    id: -1,
    uuid: uuid(),
    title,
    done: false,
    createdAt: new Date().toISOString()
  };
};
