import React, { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const CommentForm: React.FC = () => {
  const [commentEditorState, setCommentEditorState] = useState("");
  const commentEditorChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setCommentEditorState(e.target.value);
  };
  //todo type the following properly
  const keyDownHandler = (e: any): void => {
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <Fragment>
      <div className="comment-main">
        <h4 className="comment-section-heading">Leave a comment</h4>
        <div className="comment-form">
          <textarea
            className="comment-input"
            name="comment-input"
            rows={4}
            placeholder="Please be kind and constructive"
            value={commentEditorState}
            onChange={commentEditorChangeHandler}
            onKeyDown={keyDownHandler}
          />
        </div>
        <div className="comment-button">
          <button type="button" className="btn btn-action btn-comment">
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CommentForm;
