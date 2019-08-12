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

  $: console.log(todo, !todo.done);
</script>

<div class="TodoItem">
  <input
    value={todo.title}
    on:input={event => handleChange('title', event.target.value)} />
  <button on:click={() => {}}>X</button>
  <button on:click={() => handleChange('done', !todo.done)}>Done</button>
</div>
