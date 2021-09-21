import JsxParser from "react-jsx-parser";
import DOMPurify from "dompurify";

//todo convert functions to class

JsxParser.defaultProps = {
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
  renderUnrecognized: (tagName) => null,
};

export const renderHtmlAsJsx = (html: string) => {};

class Markup {
  private html: string;
  public finalMarkup: string = "";
  constructor(html: string) {
    this.html = html;
    this.generateJsxMarkup();
  }
  private sanitizeHtml() {
    const __html = DOMPurify.sanitize(this.html)
      .replaceAll("<p>", "<div>")
      .replaceAll("</p>", "</div>");
    return __html;
  }
  private splitHtml() {
    const html = this.sanitizeHtml();
    let htmlChunksArray = html.split(/(```[^`]+```)/);
    return htmlChunksArray;
  }
  private replaceLatexWithComponent() {
    const latexRegex = /(?<=[^`]|^)(```)([^`]+)\1(?=[^`]|$)/g;
    const htmlChunksArray = this.splitHtml();
    let finalChunksArray = htmlChunksArray.map((chunk: string) => {
      if (latexRegex.test(chunk)) {
        const tex = chunk.replaceAll("`", "").replaceAll("\\", "\\\\");
        chunk = `<MathComponent tex = {'${tex}'}/>`;
      }
      return chunk;
    });
    return finalChunksArray;
  }
  private generateJsxMarkup() {
    const finalHtmlMarkup = this.replaceLatexWithComponent().join("");
    this.finalMarkup = finalHtmlMarkup;
  }
}

export default Markup;
