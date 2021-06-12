<script lang="ts">
  import md from "./md";
  import wordcount from "./wordcount";
  import { example } from "./const";

  let value = new URLSearchParams(location.search).get("text") || "";

  $: html = md(value);

  $: count = wordcount(value);

  function download(text: string, filename: string) {
    const a = document.createElement("a");
    a.download = filename;
    a.style.display = "none";
    const blob = new Blob([text]);
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  let useGithubcss = false;
  let showHtml = false;
</script>

<header>
  <h1>XJJ 滴编辑器</h1>
</header>
<main>
  <div class="action">
    <div>
      <button
        on:click={() => {
          download(value, "text.md");
        }}>下载 Markdown</button
      >
      <button
        on:click={() => {
          download(html, "text.html");
        }}>下载 HTML</button
      >
      <a href="/?text={example}">查看示例</a>
      <a href="/">清空</a>
    </div>
    <div>
      <input type="checkbox" bind:checked={useGithubcss} /> 使用 GitHub 样式
      <input type="checkbox" bind:checked={showHtml} /> 显示 HTML
      <span style="float: right;">{count} 个字了哦</span>
    </div>
  </div>
  <div class="editor">
    <textarea bind:value placeholder="输入 Markdown (支持 LaTeX，Mermaid)" />
    <div class="preview">
      <div class:markdown-body={useGithubcss} class:hide={showHtml}>
        {@html html}
      </div>
      <textarea class:hide={!showHtml} value={html} readonly />
    </div>
  </div>
</main>

<style>
  header {
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    margin: 0;
  }

  header,
  .action {
    padding: 0 0.5em;
  }

  main {
    height: calc(100% - 4em);
    display: grid;
    grid-template-rows: 1fr calc(100% - 2em);
  }

  .action,
  .editor {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  textarea {
    resize: none;
  }

  textarea,
  .preview {
    border: 1px solid #ccc;
    margin: 5px;
    padding: 0.5em;
    overflow: auto;
  }

  .preview > textarea {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .action a {
    margin-left: 1em;
  }

  .hide {
    display: none;
  }
</style>
