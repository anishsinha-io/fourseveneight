//TODO refactor -> embedded media files and embedded image files need to be condensed to one state value

import React, { Fragment, useContext, useState, useEffect } from "react";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import JsxParser from "react-jsx-parser";
import Gist from "super-react-gist";
import { MathComponent } from "mathjax-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-dropdown/style.css";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";
import JSSoup from "jssoup";

import Markup from "./EditorApi";

export interface IEditorContext {
  content: string;
  embeddedMediaFiles: string[];
}

export const EditorContext = React.createContext<IEditorContext>({
  content: "",
  embeddedMediaFiles: [],
});

const RichTextEditor: React.FC<{
  updateMode?: boolean;
  object?: IEditorContext;
}> = (props) => {
  const { updateMode, object } = props;
  const [embeddedMediaFiles, setEmbeddedMediaFiles] = useState<string[]>(
    (object && object.embeddedMediaFiles) || []
  );

  //todo refactor here -> eslint disabled for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [embeddedImageFiles, setEmbeddedImageFiles] = useState<{
    [key: number]: string;
  }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [linesArray, setLinesArray] = useState<number[]>([]);

  const editorContext = useContext(EditorContext);

  useEffect(() => {
    convertContentToHTML();
  });

  const objectContent = object && object.content;
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (!updateMode || !objectContent) {
      return EditorState.createEmpty();
    } else {
      const displayMedia = object?.embeddedMediaFiles.map(
        (imageId: string) =>
          `<img src = "http://localhost:8000/api/media/image/image-fse-${imageId.replaceAll(
            `'`,
            ""
          )}"/>`
      );
      const draftInitialContent = objectContent
        .replaceAll("<figure> </figure>", () => displayMedia?.shift() || "")
        .trim();
      const blocksFromHtml = htmlToDraft(draftInitialContent);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      return EditorState.createWithContent(contentState);
    }
  });

  const [convertedContent, setConvertedContent] = useState<string>("");

  const convertContentToHTML = () => {
    try {
      const currentContentAsHTML = convertToHTML(
        editorState.getCurrentContent()
      );
      setConvertedContent(currentContentAsHTML);
      //   setHtmlMarkup(() => createFinalMarkup(currentContentAsHTML).__html);
    } catch (err) {
      //dispatch alert with error message
    }
  };
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    convertContentToHTML();
    const currentBlockKey = editorState.getSelection().getStartKey();
    const currentBlockIndex = editorState
      .getCurrentContent()
      .getBlockMap()
      .keySeq()
      .findIndex((k) => k === currentBlockKey);

    setLinesArray((prevLinesArray) => {
      return [...prevLinesArray, currentBlockIndex + 1];
    });
  };

  const createFinalMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    return {
      __html,
    };
  };

  const createPreviewMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    console.log(embeddedMediaFiles);
    const markup = new Markup(__html, embeddedMediaFiles).finalMarkup;
    const finalEditorContent = createFinalMarkup(__html);

    console.log("markup", markup);
    // console.log(editorContext.content);
    console.log(editorContext.embeddedMediaFiles);
    let imgArray = new JSSoup(markup).findAll("img");

    imgArray = imgArray.map((imgSoup: any) =>
      imgSoup.attrs.src.split("/").pop().replace("image-fse-", "")
    );

    console.log("imgArray", imgArray);
    editorContext.content = finalEditorContent.__html;
    // console.log(editorContext.content);
    editorContext.embeddedMediaFiles = embeddedMediaFiles;

    return markup;
  };

  //todo refactor here
  const _uploadImageCallback = async (file: File) => {
    try {
      const ApiInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = localStorage.token;
      if (token) ApiInstance.defaults.headers.common["Authorization"] = token;
      const formData = new FormData();
      formData.append("image", file);
      const res = await ApiInstance.post("/media/upload", formData);
      const _imageUrl = res.data.split("/")[1];

      await ApiInstance.get(`/media/file/image-fse-${_imageUrl}`);

      let prevLines: number[] = [];
      setLinesArray((prevLinesArray) => {
        prevLines = [...prevLinesArray];
        const lastLineNumber = prevLines.pop();
        const maxLine = Math.max(...prevLines);
        setEmbeddedImageFiles((prevEmbeddedImageFiles) => {
          setEmbeddedMediaFiles(() => Object.values(prevEmbeddedImageFiles));
          const relativeImagePosition = lastLineNumber || 1 / maxLine;
          return {
            ...prevEmbeddedImageFiles,
            [relativeImagePosition]: _imageUrl,
          };
        });
        return [...prevLinesArray, 0];
      });

      console.log(editorContext);
      // const markup = new Markup(
      //   editorContext.content,
      //   editorContext.embeddedMediaFiles
      // ).finalMarkup;
      // console.log("markup", markup);
      // console.log(editorContext.content);
      // console.log(editorContext.embeddedMediaFiles);
      // let imgArray = new JSSoup(markup).findAll("img");

      // imgArray = imgArray.map((imgSoup: any) =>
      //   imgSoup.attrs.src.split("/").pop().replace("image-fse-", "")
      // );

      // console.log("imgArray pre-filter", imgArray);

      setEmbeddedMediaFiles((prevEmbeddedMediaFiles) => {
        console.log("here", prevEmbeddedMediaFiles);
        // imgArray = imgArray.filter((img: string) =>
        //   prevEmbeddedMediaFiles.includes(img)
        // );

        // console.log("imgArray", imgArray);
        return [...prevEmbeddedMediaFiles];
      });

      return new Promise((resolve, _) => {
        resolve({
          data: {
            link: `http://localhost:8000/api/media/file/image-fse-${_imageUrl}`,
          },
        });
      });
    } catch (err) {
      //dispatch alert
    }
  };

  //default editor options -> can be extended with options from https://jpuri.github.io/react-draft-wysiwyg/#/docs

  const editorOptions = {
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
      uploadCallback: _uploadImageCallback,
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

  return (
    <Fragment>
      <Editor
        wrapperClassName="editor-main__editor"
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={editorOptions}
        stripPastedStyles
        placeholder="Tell your story..."
        toolbarClassName="editor-main__toolbar"
      />
      <h3>Preview</h3>
      <JsxParser
        components={{ Gist, MathComponent }}
        jsx={createPreviewMarkup(convertedContent)}
        className="editor-main__preview"
      />
    </Fragment>
  );
};

export default RichTextEditor;
