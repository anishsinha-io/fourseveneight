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
  blockType: {
    options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
  },
  list: { inDropdown: false, options: ["ordered", "unordered"] },
  textAlign: { inDropdown: false },
  link: { inDropdown: false },
  history: { inDropdown: false },
  image: { inDropdown: true },
};
