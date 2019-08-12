import MockAdapter from "axios-mock-adapter";
import { axios } from ".";
import * as Todo from "../todo/todo";

const mock = new MockAdapter(axios);

let lastId = 1;

let todos: Todo.List = [
  { id: 0, title: "Get Milk", createdAt: "2019-08-12", done: false },
  { id: 1, title: "Learn Svelte", createdAt: "2019-08-12", done: true }
];

const newTodo = () => {
  lastId++;

  const todo = {
    id: lastId++,
    title: "",
    createdAt: new Date().toISOString(),
    done: false
  };

  todos.push(todo);

  return todo;
};

const updateTodo = (updated: Todo.T) => {
  todos.map(todo => {
    if (todo.id === updated.id) return updated;
    return todo;
  });
};

const deleteTodo = (toDelete: Todo.T) => {
  todos = todos.filter(todo => todo.id !== toDelete.id);
};

mock.onGet("http://localhost:3000/api/todos/").reply(200, todos);
mock.onPost("http://localhost:3000/api/todos/").reply(201, newTodo);
mock.onPut("http://localhost:3000/api/todos/:id").reply(200, updateTodo);
mock.onDelete("http://localhost:3000/api/todos/:id").reply(204, deleteTodo);
