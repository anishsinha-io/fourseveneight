export const editorOptions = {
  options: [
    "inline",
    "blockType",
    "list",
    "textAlign",
    "history",
    "image",
    "link",
    "embedded",
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
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: true, mandatory: true },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
  embedded: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};
