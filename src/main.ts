import App from "./App.svelte";
import './global.css';
import 'katex/dist/katex.css';
import 'github-markdown-css';

const app = new App({
  target: document.getElementById("app")
})

export default app;