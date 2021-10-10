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

import Markup from "./EditorApi";

import { INewPost } from "../post/postSlice";
import { INewQuestion } from "../question/questionSlice";
import { useAppSelector } from "../../app/hooks";

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
  featureType: "post" | "question";
  object?: INewPost | INewQuestion;
}> = (props) => {
  const { updateMode, featureType, object } = props;
  const [embeddedMediaFiles, setEmbeddedMediaFiles] = useState<string[]>(
    (object && object.embeddedMediaFiles) || []
  );

  const editorContext = useContext(EditorContext);

  useEffect(() => {
    convertContentToHTML();
  });

  //upload image callback -> send media to AWS, get a link, and immediately return its id.
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

      setEmbeddedMediaFiles((prevEmbeddedMediaFiles) => [
        ...prevEmbeddedMediaFiles,
        _imageUrl,
      ]);

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

  const objectContent = useAppSelector((state) =>
    featureType === "post"
      ? state.post.post.content
      : state.question.question.content || null
  );

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
      const draftInitialContent = objectContent.replaceAll(
        "<figure> </figure>",
        () => displayMedia?.shift() || ""
      );
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
  };

  const createFinalMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    return {
      __html,
    };
  };

  const createPreviewMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    const markup = new Markup(__html, embeddedMediaFiles).finalMarkup;
    const finalEditorContent = createFinalMarkup(__html);
    editorContext.content = finalEditorContent.__html;
    editorContext.embeddedMediaFiles = embeddedMediaFiles;
    return markup;
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
