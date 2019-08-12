<script>
  import { onMount } from "svelte";
  import _ from "lodash";

  import {
    todoList,
    loadTodos,
    doneTodos,
    pendingTodos,
    areTodosDone,
    updateTodo,
    deleteTodo
  } from "./stores";
  import TodoItem from "./TodoItem.svelte";

  onMount(async () => {
    loadTodos();
  });

  $: console.log($todoList);

  const handleChange = todo => {
    updateTodo(todo);
  };
</script>

<div class="TodoList">
  <h1 class="f1">Todo List</h1>

  <hr />

  {#if $areTodosDone}Done!{/if}

  {#each $pendingTodos as todo (todo.uuid || todo.id)}
    <TodoItem {todo} onChange={handleChange} onDelete={deleteTodo} />
  {/each}

  <h2>Done</h2>

  {#each $doneTodos as todo (todo.uuid || todo.id)}
    <TodoItem {todo} onChange={handleChange} onDelete={deleteTodo} />
  {/each}
</div>
