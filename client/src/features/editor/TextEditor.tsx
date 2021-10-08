import React, { useState, Fragment } from "react";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import JsxParser from "react-jsx-parser";
import Gist from "super-react-gist";
import { MathComponent } from "mathjax-react";
import Dropdown, { Option } from "react-dropdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-dropdown/style.css";
import ChipInput from "material-ui-chip-input";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";

import {
  getAndLoadPosts,
  INewPost,
  createPost,
  updatePost,
  deletePost,
} from "../post/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

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
  const [chipItems, setChipItems] = useState<string[]>(oldPost.tags || []);
  const [embeddedMediaFiles, setEmbeddedMediaFiles] = useState<string[]>(
    oldPost.embeddedMediaFiles || []
  );

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
      console.log(
        `http://localhost:8000/api/media/image/image-fse-${_imageUrl}`
      );

      console.log(_imageUrl);

      const _imageObjectAWS = await ApiInstance.get(
        `/media/file/image-fse-${_imageUrl}`
      );

      setEmbeddedMediaFiles([...embeddedMediaFiles, _imageUrl]);

      console.log(_imageObjectAWS);
      console.log("mediaFiles:", embeddedMediaFiles);

      return new Promise((resolve, reject) => {
        resolve({
          data: {
            link: `http://localhost:8000/api/media/file/image-fse-${_imageUrl}`,
          },
        });
      });
    } catch (err) {}
  };

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

  const postContent = useAppSelector(
    (state) => state.post.post.content || null
  );
  const [editorState, setEditorState] = useState(() => {
    if (!props.updateMode || !postContent) {
      return EditorState.createEmpty();
    } else {
      const displayMedia = oldPost.embeddedMediaFiles.map(
        (imageId: string) =>
          `<img src = "http://localhost:8000/api/media/image/image-fse-${imageId.replaceAll(
            `'`,
            ""
          )}"/>`
      );
      const draftInitialContent = postContent.replaceAll(
        "<figure> </figure>",
        () => displayMedia.shift() || "nothing"
      );
      console.log(postContent);
      const blocksFromHtml = htmlToDraft(draftInitialContent);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      return EditorState.createWithContent(contentState);
    }
  });
  const [convertedContent, setConvertedContent] = useState<any>();
  const [formData, setFormData] = useState<INewPost>({
    title: oldPost.title || "",
    image: null,
    imageAlt: oldPost.imageAlt || "",
    summary: oldPost.summary || "",
    content: "",
    tags: oldPost.tags || ([] as string[]),
    category: oldPost.category || "",
    embeddedMediaFiles: oldPost.embeddedMediaFiles || [],
  });

  const { title, summary, imageAlt } = formData;

  const postCategoryOptions: string[] = [
    "computer science",
    "politics",
    "mathematics",
    "history",
    "entertainment",
  ];

  const [shownCategoryOption, setShownCategoryOption] = useState<string>("");

  //Event handlers

  const handleAddChip = (chip: string) => {
    if (chipItems.length < 5) setChipItems([...chipItems, chip]);
    else return;
  };

  const handleDeleteChip = (chip: string) => {
    const newChips = chipItems.filter((chipItem: string) => chipItem !== chip);
    setChipItems(newChips);
  };

  const handleCategoryChange = (category: Option) => {
    const value = category.value;
    setShownCategoryOption(value);
  };

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

  const handleDeleteSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.updateMode) dispatch(deletePost(oldPost.slug));
    return history.push("/");
  };

  const handleEditorChange = (state: EditorState) => {
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

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    convertContentToHTML();
    setShowConfirmButton(true);
  };

  const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDeleteButton(true);
  };

  const handleFormSubmit = async (e: any) => {
    try {
      e.preventDefault();
      convertContentToHTML();
      const content = createFinalMarkup(convertedContent).__html;
      console.log(embeddedMediaFiles);
      const submitFields: INewPost = {
        title,
        image,
        imageAlt,
        summary,
        content,
        tags: chipItems,
        category: shownCategoryOption,
        embeddedMediaFiles,
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

  const createPreviewMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    console.log(embeddedMediaFiles);
    const markup = new Markup(__html, embeddedMediaFiles).finalMarkup;
    console.log(markup);

    return markup;
  };

  const createFinalMarkup = (html: string) => {
    const __html = DOMPurify.sanitize(`<div>${html}</div>`);
    return {
      __html,
    };
  };

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
            onClick={handleDeleteSubmit}
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
                // onChange={(category: any) => {
                //   console.log(category);
                // }}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="editor__meta-chips">
              <label htmlFor="editor-chips">
                <em>Tags: </em>
              </label>
              <ChipInput
                value={chipItems}
                newChipKeys={["Enter"]}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                allowDuplicates={false}
                blurBehavior="clear"
                placeholder="Add tags to your post"
                fullWidthInput={true}
                variant="standard"
                helperText="Enter between 1 and 5 tags"
              />
            </div>
          </div>
        </form>
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
        {props.updateMode && !showConfirmButton && (
          <button
            className="btn btn-action"
            type="button"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {props.updateMode && showConfirmButton && (
          <button
            className="btn btn-confirm"
            type="button"
            onClick={handleFormSubmit}
          >
            Confirm
          </button>
        )}
        {!props.updateMode && (
          <button
            type="button"
            onClick={handleFormSubmit}
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
