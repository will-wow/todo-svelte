<script>
  import { updateTodo } from "./stores";
  export let todo;

  function handleChange(event) {
    updateTodo(todo.id, "title", event.target.value);
  }
</script>

<div class="TodoItem">
  <input value={todo.title} on:input={handleChange} />
  <button>X</button>
  <button>Done</button>
</div>
