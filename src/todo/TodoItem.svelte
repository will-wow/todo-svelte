<script>
  import { createEventDispatcher } from "svelte";
  import { updateTodo } from "./stores";
  const dispatch = createEventDispatcher();

  export let todo;

  function handleChange(key, value) {
    console.log(key, value);
    dispatch("change", {
      ...todo,
      [key]: value
    });
  }

  $: done = todo.done;
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<div class="TodoItem">
  <input
    class:done
    value={todo.title}
    on:input={event => handleChange('title', event.target.value)} />
  <button on:click={() => {}}>X</button>
  <button on:click={() => handleChange('done', !todo.done)}>
    {done ? 'Undo' : 'Done'}
  </button>
</div>
