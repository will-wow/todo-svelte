<script>
  import { get } from "./api";
  export let name;

  console.log("foo");

  console.log(get("http://localhost:3000").then(console.log));
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>
