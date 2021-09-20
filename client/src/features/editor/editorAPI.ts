import Post from "../post/Post";

export const editorOptions = {
  options: [
    "inline",
    "blockType",
    "list",
    "textAlign",
    "history",
    "image",
    "link",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  list: { inDropdown: false, options: ["ordered", "unordered"] },
  textAlign: { inDropdown: false },
  link: { inDropdown: false },
  history: { inDropdown: false },
  image: { inDropdown: true },
};

class Preview {
  protected html: string;
  protected regexp: RegExp = /(?<=[^`]|^)(```)([^`]+)\1(?=[^`]|$)/g;
  public htmlChunks: string[] = [];
  public latexArray: string[] = [];
  public latexIndexArray: number[] = [];
  constructor(html: string) {
    this.html = html;
    this.getLatexInstances();
  }
  private splitHtml() {
    this.htmlChunks = this.html.split(/(```[^`]+```)/);
  }
  private getLatexInstances() {
    this.splitHtml();
    this.htmlChunks.forEach((part: string, index: number) => {
      if (this.regexp.test(part)) {
        part = part.replace("`", "");
        this.latexArray.push(part);
        this.latexIndexArray.push(index);
      }
    });
  }
  private generateHtml() {}
}

export default Preview;
