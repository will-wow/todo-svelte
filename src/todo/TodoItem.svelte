<script>
  import { createEventDispatcher } from "svelte";
  import { updateTodo } from "./stores";
  const dispatch = createEventDispatcher();

  export let todo;

  function handleChange(event) {
    console.log(todo);
    dispatch("change", {
      ...todo,
      title: event.target.value
    });
  }
</script>

<div class="TodoItem">
  <input value={todo.title} on:input={handleChange} />
  <button>X</button>
  <button>Done</button>
</div>
