const editorOptions = {
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

export default editorOptions;
