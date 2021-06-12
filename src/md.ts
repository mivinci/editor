import marked from "marked";
import mermaid from "mermaid";
import { renderToString } from "katex";

let i = 0;

marked.use({
  renderer: {
    code: (code: string, lang: string) => {
      if (lang == 'mermaid') {
        try {
          code = mermaid.render(`a${i++}`, code);
        } catch (e) {

        }
        return code;
      }
      return false;
    },

    paragraph: (text: string) => {
      // unescape
      text = text.replace(/&amp;/g, "&").replace(/ \\ /g, "\\\\");

      let matched = false;

      // block formula
      let html = text.replace(/\$\$\n([\s\S]+?)\$\$/g, (_, tex) => {
        matched = true;
        return renderToString(tex, {
          throwOnError: false,
          displayMode: true,
        });
      });

      if (matched) {
        return "<p>" + html + "</p>";
      }

      // inline formula
      html = text.replace(/\$(.+?)\$/g, (_, tex) => {
        matched = true;
        return renderToString(tex, { throwOnError: false });
      });

      if (matched) {
        return "<p>" + html + "</p>";
      }

      return false;
    }
  }
})

export default function md(text: string): string {
  return marked(text);
}