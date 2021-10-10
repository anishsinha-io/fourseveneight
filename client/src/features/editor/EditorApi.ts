import DOMPurify from "dompurify";

export const JsxParserDefaultProps = {
  allowUnknownElements: true,
  autoCloseVoidElements: false,
  bindings: {},
  blacklistedAttrs: [/^on.+/i],
  blacklistedTags: ["script"],
  className: "",
  components: {},
  componentsOnly: false,
  disableFragments: false,
  disableKeyGeneration: false,
  jsx: "",
  onError: () => {},
  showWarnings: false,
  renderError: undefined,
  renderInWrapper: true,
  renderUnrecognized: (tagName: string) => null,
};

class Markup {
  private html: string;
  private media: string[];
  public finalMarkup: string = "";
  constructor(html: string, media: string[]) {
    this.html = html;
    this.media = media;
    this.generateJsxMarkup();
  }
  private sanitizeHtml() {
    this.media = this.media.map(
      (imageId: string) =>
        `<img src = "http://localhost:8000/api/media/image/image-fse-${imageId.replaceAll(
          `'`,
          ""
        )}"/>`
    );
    const __html = DOMPurify.sanitize(this.html)
      .replaceAll("<p>", "<div>")
      .replaceAll("</p>", "</div>")
      .replaceAll("<figure> </figure>", () => this.media.shift() || "");
    return __html;
  }
  private splitHtml() {
    const html = this.sanitizeHtml();
    let htmlChunksArray = html.split(/(```[^`]+```)/);
    return htmlChunksArray;
  }
  private replaceWithComponent() {
    const htmlChunksArray = this.splitHtml();
    const finalChunksArray = htmlChunksArray.map((chunk: string) => {
      if (chunk.startsWith("```code")) {
        const url = chunk.replace("code", "").replaceAll("`", "");
        const trimmedUrl = url.trim();
        chunk = `<br/><Gist url = "${trimmedUrl}"/><br/>`;
      } else if (chunk.startsWith("```latex")) {
        const tex = chunk
          .replace("latex", "")
          .replaceAll("`", "")
          .replaceAll("\\", "\\\\")
          .trim();
        chunk = `<MathComponent tex = {'${tex}'}/>`;
      } else if (chunk.startsWith("```raw")) {
        const content = chunk.replaceAll("`", "").replace("raw", "").trim();
        chunk = `<pre>${content}</pre>`;
      }
      return chunk;
    });
    return finalChunksArray;
  }

  private generateJsxMarkup() {
    const finalHtmlMarkup = this.replaceWithComponent().join("");
    this.finalMarkup = finalHtmlMarkup;
  }
}

export const decompileHtml = (html: string) => {
  const decompiledHtml = html.replaceAll(/\\<.*?\\>/g, "");
  return decompiledHtml;
};

export default Markup;
