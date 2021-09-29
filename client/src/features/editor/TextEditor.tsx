import React, { useState, Fragment } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import JsxParser from "react-jsx-parser";
import Gist from "super-react-gist";
import { MathComponent } from "mathjax-react";
import JSSoup from "jssoup";
import Chips from "react-chips";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  getAndLoadPosts,
  INewPost,
  createPost,
  updatePost,
  deletePost,
} from "../post/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorOptions } from "./editorAPI";
import Markup from "../post/postAPI";
export interface IFileData {
  image: any;
  alt: string;
}

const TextEditor: React.FC<{ updateMode?: boolean }> = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const oldPost = useAppSelector((state) => state.post.post);
  const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState<INewPost>({
    title: oldPost.title || "",
    image: null,
    imageAlt: oldPost.imageAlt || "",
    summary: oldPost.summary || "",
    content: "",
  });
  const postCategoryOptions: string[] = [
    "computer science",
    "politics",
    "mathematics",
    "history",
    "entertainment",
  ];

  const [shownCategoryOption, setShownCategoryOption] = useState<string>(
    postCategoryOptions[0]
  );

  const handleDropdownChange = (e: any) => {
    console.log(e);
    setShownCategoryOption(e.value);
  };

  const [chipItems, setChipItems] = useState<string[]>([]);

  const handleChipChange = (chips: string[]) => {
    setChipItems(chips);
  };

  const { title, summary, imageAlt } = formData;

  const postContent = useAppSelector(
    (state) => state.post.post.content || null
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageUrl(objectURL);
      setImage(file);
    }
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
  const deleteSubmitHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (props.updateMode) dispatch(deletePost(oldPost.slug));
    return history.push("/");
  };

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
  const updateButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    convertContentToHTML();
    setShowConfirmButton(true);
  };

  const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteButton(true);
  };

  const createFinalMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const formSubmitHandler = async (e: any) => {
    try {
      e.preventDefault();
      convertContentToHTML();
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
        return history.push("/");
      }
      submitFields.slug = oldPost.slug;
      dispatch(updatePost(submitFields));
      dispatch(getAndLoadPosts);
      return history.push("/");
    } catch (err) {
      //dispatch alert
    }
  };

  //todo add onTab, onBlur handlers
  return (
    <Fragment>
      <div className="editor-main">
        {props.updateMode && !showDeleteButton && (
          <button
            type="button"
            className="btn btn-action"
            onClick={deleteButtonHandler}
          >
            Delete
          </button>
        )}
        {props.updateMode && showDeleteButton && (
          <button
            type="button"
            className="btn btn-confirm"
            onClick={deleteSubmitHandler}
          >
            Confirm
          </button>
        )}
        <form className="editor-main__form">
          <h3 className="form-heading">
            {props.updateMode ? "Update your post" : "Create a new post"}
          </h3>

          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Your post title"
            onChange={handleFieldChange}
            value={title}
          />

          <input
            className="form-input"
            type="summary"
            name="summary"
            placeholder="Your post description"
            onChange={handleFieldChange}
            value={summary}
          />
          <input
            className="form-input"
            type="text"
            name="imageAlt"
            placeholder="your image description"
            value={imageAlt}
            onChange={handleFieldChange}
          />
          <div className="editor__meta">
            <div className="editor__meta-file file-input">
              <label htmlFor="file-input">
                <em>Cover Image: </em>
              </label>
              {imageUrl && (
                <img
                  className="file-input__image"
                  src={imageUrl || ""}
                  alt={imageAlt || ``}
                />
              )}
              <input type="file" onChange={handleFileSelect} />
              <span className="button">Choose</span>
              <span className="label">
                {image ? image.name : "No file selected"}
              </span>
            </div>
            <div className="editor__meta-dropdown">
              <label htmlFor="editor-dropdown">
                <em>Category: </em>
              </label>
              <Dropdown
                options={postCategoryOptions}
                value={shownCategoryOption}
                onChange={handleDropdownChange}
              />
            </div>

            <div className="editor__meta-chips">
              <label htmlFor="editor-chips">
                <em>Tags: </em>
              </label>
              <Chips
                value={chipItems}
                onChange={handleChipChange}
                suggestions={["Your", "Data", "Here"]}
              />
            </div>
          </div>
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
        {props.updateMode && !showConfirmButton && (
          <button
            className="btn btn-action"
            type="button"
            onClick={updateButtonHandler}
          >
            Update
          </button>
        )}
        {props.updateMode && showConfirmButton && (
          <button
            className="btn btn-confirm"
            type="button"
            onClick={formSubmitHandler}
          >
            Confirm
          </button>
        )}
        {!props.updateMode && (
          <button
            type="button"
            onClick={formSubmitHandler}
            className="btn btn-action"
          >
            <span>Create</span>
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default TextEditor;
