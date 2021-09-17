import React, { useState, Fragment } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
// import { useAppDispatch } from "../../app/hooks";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor: React.FC = () => {
  interface INewPost {
    title: string;
    summary: string;
    content: string;
  }
  const [formData, setFormData] = useState<INewPost>({
    title: "",
    summary: "",
    content: "",
  });

  const { title, summary } = formData;

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState<any>();
  const editorChangeHandler = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    const htmlString = createMarkup(convertedContent);
    console.log(htmlString);
    const submitFields: INewPost = {
      title,
      summary,
      content: htmlString.__html,
    };
    console.log(submitFields);
  };
  return (
    <Fragment>
      <div>
        <form>
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
        </form>
        <Editor
          editorState={editorState}
          onEditorStateChange={editorChangeHandler}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>

      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
      <button type="button" onClick={formSubmitHandler}>
        Post
      </button>
    </Fragment>
  );
};

export default TextEditor;
