<script>
  export let todo;
  export let onDelete;
  export let onChange;

  function handleChange(key, value) {
    onChange({ ...todo, [key]: value });
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
    placeholder="Enter a thing to do"
    on:input={event => handleChange('title', event.target.value)} />
  <button on:click={() => onDelete(todo)} class="white bg-red">X</button>
  <button
    on:click={() => handleChange('done', !todo.done)}
    class="white"
    class:bg-blue={!done}
    class:bg-light-blue={done}>
    {done ? 'Undo' : 'Done'}
  </button>
</div>
