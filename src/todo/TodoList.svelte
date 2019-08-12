<script>
  import { onMount } from "svelte";
  import _ from "lodash";

  import {
    todoList,
    loadTodos,
    doneTodos,
    pendingTodos,
    areTodosDone,
    updateTodo
  } from "./stores";
  import TodoItem from "./TodoItem.svelte";

  $: console.log($todoList);

  onMount(async () => {
    loadTodos();
  });

  const handleChange = ({ detail: todo }) => {
    console.log({ todo });
    updateTodo(todo);
  };
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<div class="TodoList">
  <h1>Todo List</h1>

  <hr />

  {#if $areTodosDone}Done!{/if}

  {#each $pendingTodos as todo (todo.uuid || todo.id)}
    <TodoItem {todo} on:change={handleChange} />
  {/each}

  <h2>Done</h2>

  {#each $doneTodos as todo (todo.uuid || todo.id)}
    <TodoItem {todo} on:change={handleChange} />
  {/each}
</div>
