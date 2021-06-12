import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    svelte({
      preprocess: preprocess()
    })
  ]
}

export default config;