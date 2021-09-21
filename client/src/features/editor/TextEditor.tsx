import React, { useState, Fragment } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { MathComponent } from "mathjax-react";

import { getAndLoadPosts, INewPost } from "../post/postSlice";
import { useAppDispatch } from "../../app/hooks";
import { createPost } from "../post/postSlice";
import { editorOptions } from "./editorAPI";
export interface IFileData {
  image: any;
  alt: string;
}

const TextEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(null);
  const [formData, setFormData] = useState<INewPost>({
    title: "",
    image: null,
    imageAlt: "",
    summary: "",
    content: "",
  });

  const { title, summary, imageAlt } = formData;

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileSelectedHandler = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState<any>();
  const editorChangeHandler = (state: EditorState) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createPreviewMarkup = (html: string) => {
    let __html = DOMPurify.sanitize(html);
    console.log(__html);
    return {
      __html,
    };
  };

  const createFinalMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    const content = createFinalMarkup(convertedContent).__html;
    const submitFields: INewPost = {
      title,
      image,
      imageAlt,
      summary,
      content,
    };
    dispatch(createPost(submitFields));
    dispatch(getAndLoadPosts);
  };

  //todo add onTab, onBlur handlers
  return (
    <Fragment>
      <div className="editor-main">
        <form className="editor-main__form">
          <input
            type="text"
            name="title"
            placeholder="Your post title"
            onChange={fieldChangeHandler}
            value={title}
          />
          <input
            type="summary"
            name="summary"
            placeholder="Your post description"
            onChange={fieldChangeHandler}
            value={summary}
          />
          <input
            type="text"
            name="imageAlt"
            placeholder="your image description"
            value={imageAlt}
            onChange={fieldChangeHandler}
          />
          <input onChange={fileSelectedHandler} type="file" accept="image/*" />
        </form>
        <Editor
          wrapperClassName="editor-main__editor"
          editorState={editorState}
          onEditorStateChange={editorChangeHandler}
          toolbar={editorOptions}
        />
      </div>

      <div
        className="editor-preview"
        dangerouslySetInnerHTML={createPreviewMarkup(convertedContent)}
      ></div>
      <button
        className="btn btn-action"
        type="button"
        onClick={formSubmitHandler}
      >
        Post
      </button>
    </Fragment>
  );
};

export default TextEditor;
