<script>
  import { onMount } from "svelte";
  import { todoList, doneTodos, pendingTodos, areTodosDone } from "./stores";

  onMount(async () => {
    todoList.load();
  });
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

  {#each $pendingTodos as todo (todo.uuid || todo.id)}{todo.title}{/each}

  <h2>Done</h2>

  {#each $doneTodos as todo (todo.uuid || todo.id)}{todo.title}{/each}
</div>
