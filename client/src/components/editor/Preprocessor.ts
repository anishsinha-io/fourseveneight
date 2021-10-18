import DOMPurify from "dompurify";
import JSSoup from "jssoup";

export const JsxParserDefaultProps = {
  allowUnknownElements: true,
  autoCloseVoidElements: true,
  bindings: {},
  blacklistedAttrs: [/^on.+/i],
  blacklistedTags: ["script"],
  className: "",
  components: {},
  componentsOnly: false,
  disableFragments: false,
  disableKeyGeneration: false,
  jsx: "",
  onError: (err: any) => {
    console.log(err);
  },
  showWarnings: true,
  renderError: undefined,
  renderInWrapper: true,
  renderUnrecognized: () => null,
};

export interface IPreprocessor {
  generateFinalMarkup: () => string;
}

export default class Preprocessor implements IPreprocessor {
  private html: string;

  constructor(html: string) {
    this.html = html;
  }

  //clean
  private sanitizeHtml() {
    const __html = DOMPurify.sanitize(this.html);
    return __html;
  }

  //to avoid errors parsing html as JSX
  private normalizeHtml(html: string) {
    const normalizedHtml = html
      .replaceAll("{", "&#123;")
      .replaceAll("}", "&#125;");
    return normalizedHtml;
  }

  //split by ```latex|code|<T> <content>```
  private splitHtml(html: string) {
    const htmlChunksArray = html.split(/(```[^`]+```)/);
    return htmlChunksArray;
  }

  //embed jsx elements
  private embedJsxComponent(chunks: string[]) {
    const finalChunksArray = chunks.map((chunk: string) => {
      //any number of Jsx components can be embedded by adding more else if statements below

      if (chunk.startsWith("```code")) {
        //replace ```code <gist url>``` with a gist
        //pasted gist links will *always* have the form of <a href = 'https://gist.github.com/<user>/<gist id>' so we can parse the anchor
        //tag for the href attribute and pass that into the gist.

        const url = chunk.replace("code", "").replaceAll("`", "");

        const trimmedUrl = url.trim();

        const anchorTagHref = new JSSoup(trimmedUrl)
          .find("a")
          .attrs.href.replaceAll(`\``, "");

        chunk = `<br/><Gist url = "${anchorTagHref}"/><br/>`;
      } else if (chunk.startsWith("```latex")) {
        // replace ```latex <latex>``` with a MathComponent if the expression is valid
        const tex = chunk
          .replace("latex", "")
          .replaceAll("`", "")
          .replaceAll("\\", "\\\\")
          .trim();
        chunk = `<MathComponent tex = {'${tex}'}/>`;
      }
      return chunk;
    });
    const finalMarkup = finalChunksArray.join("");
    return finalMarkup;
  }

  public generateFinalMarkup() {
    const sanitizedHtml = this.sanitizeHtml();
    const normalizedHtml = this.normalizeHtml(sanitizedHtml);
    const htmlChunks = this.splitHtml(normalizedHtml);
    const finalMarkup = this.embedJsxComponent(htmlChunks);
    return finalMarkup;
  }
}
