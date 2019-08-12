import App from "./App.svelte";
import "./api/mock-server";

const app = new App({
  target: document.body,
  props: {
    name: "world"
  }
});

export default app;
