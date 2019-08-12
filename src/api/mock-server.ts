import MockAdapter from "axios-mock-adapter";
import { axios } from ".";
import * as Todo from "../todo/todo";

const mock = new MockAdapter(axios);

const defaultTodos = [
  { id: 0, title: "Get Milk", createdAt: "2019-08-12", done: false },
  { id: 1, title: "Learn Svelte", createdAt: "2019-08-12", done: true }
];

let lastId = 1;

let todos: Todo.List = [];

const loadTodos = () => {
  const data = window.localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : defaultTodos;
  return todos;
};

const saveTodos = () => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
};

const newTodo = () => {
  lastId++;

  const todo = {
    id: lastId++,
    title: "",
    createdAt: new Date().toISOString(),
    done: false
  };

  todos.push(todo);

  saveTodos();
  return todo;
};

const updateTodo = (updated: Todo.T) => {
  console.log({ updated });
  todos = todos.map(todo => {
    if (todo.id === updated.id) return updated;
    return todo;
  });
  saveTodos();
  return updated;
};

const deleteTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id);
};

const getIdFromPath = (path: string | undefined): number => {
  const parts = path ? path.split("/") : [];
  const id = parts[parts.length - 1];
  return parseInt(id);
};

mock.onGet("http://localhost:3000/api/todos/").reply(() => [200, loadTodos()]);
mock.onPost("http://localhost:3000/api/todos/").reply(() => [201, newTodo()]);
mock
  .onPut(new RegExp("http://localhost:3000/api/todos/\\d+"))
  .reply(config => [200, updateTodo(JSON.parse(config.data))]);
mock
  .onDelete(new RegExp("http://localhost:3000/api/todos/\\d+"))
  .reply(config => [204, deleteTodo(getIdFromPath(config.url))]);
