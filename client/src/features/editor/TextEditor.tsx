import React, { useState, Fragment } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import JsxParser from "react-jsx-parser";
import Gist from "super-react-gist";
import { MathComponent } from "mathjax-react";
import JSSoup from "jssoup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  getAndLoadPosts,
  INewPost,
  createPost,
  updatePost,
} from "../post/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorOptions } from "./editorAPI";
import Markup from "../post/postAPI";
export interface IFileData {
  image: any;
  alt: string;
}

const TextEditor: React.FC<{ updateMode?: boolean; postSlug?: string }> = (
  props
) => {
  const dispatch = useAppDispatch();
  const oldPost = useAppSelector((state) => state.post.post);
  const [image, setImage] = useState<any>(null);
  const [formData, setFormData] = useState<INewPost>({
    title: oldPost.title || "",
    image: null,
    imageAlt: oldPost.imageAlt || "",
    summary: oldPost.summary || "",
    content: "",
  });

  const { title, summary, imageAlt } = formData;

  const postContent = useAppSelector(
    (state) => state.post.post.content || null
  );

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileSelectedHandler = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const [editorState, setEditorState] = useState(() => {
    if (!props.updateMode) {
      return EditorState.createEmpty();
    } else {
      const initialContentState = new JSSoup(postContent).text;
      return EditorState.createWithContent(
        ContentState.createFromText(initialContentState)
      );
    }
  });

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
    if (!props.updateMode) {
      dispatch(createPost(submitFields));
      dispatch(getAndLoadPosts());
    }
    submitFields.slug = oldPost.slug;
    dispatch(updatePost(submitFields));
    dispatch(getAndLoadPosts);
  };

  //todo add onTab, onBlur handlers
  return (
    <Fragment>
      <div className="editor-main">
        <form className="editor-main__form">
          <h3 className="form-heading">
            {props.updateMode ? "Update your post" : "Create a new post"}
          </h3>

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
          {props.updateMode ? "Update" : "Post"}
        </button>
      </div>
    </Fragment>
  );
};

export default TextEditor;
