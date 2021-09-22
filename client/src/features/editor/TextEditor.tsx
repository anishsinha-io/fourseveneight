import React, { useState, Fragment } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import JsxParser from "react-jsx-parser";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Gist from "super-react-gist";
import { MathComponent } from "mathjax-react";

import { getAndLoadPosts, INewPost } from "../post/postSlice";
import { useAppDispatch } from "../../app/hooks";
import { createPost } from "../post/postSlice";
import { editorOptions } from "./editorAPI";
import Markup from "../post/postAPI";
export interface IFileData {
  image: any;
  alt: string;
}

const TextEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(null);
  // const [showPreview, setShowPreview] = useState<boolean>(false);
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
    try {
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);
    } catch (err) {
      console.log(err);
    }
  };
  const createPreviewMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(html);
    const markup = new Markup(__html).finalMarkup;
    console.log(markup);
    return markup;
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
          <h3 className="form-heading">Create a new post</h3>

          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Your post title"
            onChange={fieldChangeHandler}
            value={title}
          />
          <input
            className="form-input"
            type="summary"
            name="summary"
            placeholder="Your post description"
            onChange={fieldChangeHandler}
            value={summary}
          />
          <input
            className="form-input"
            type="text"
            name="imageAlt"
            placeholder="your image description"
            value={imageAlt}
            onChange={fieldChangeHandler}
          />
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={fileSelectedHandler}
          />
          <label htmlFor="file" className="btn-3">
            <span>Upload Cover Image</span>
          </label>
        </form>
        <Editor
          wrapperClassName="editor-main__editor"
          editorState={editorState}
          onEditorStateChange={editorChangeHandler}
          toolbar={editorOptions}
          handlePastedText={() => false}
          stripPastedStyles
          placeholder="Tell your story..."
        />
        <h3>Preview</h3>
        <JsxParser
          components={{ Gist, MathComponent }}
          jsx={createPreviewMarkup(convertedContent)}
          className="editor-main__preview"
        />
        <button
          className="btn btn-action"
          type="button"
          onClick={formSubmitHandler}
        >
          Post
        </button>
      </div>

      {/* <div
        className="editor-preview"
        dangerouslySetInnerHTML={createPreviewMarkup(convertedContent)}
      ></div> */}
    </Fragment>
  );
};

export default TextEditor;
