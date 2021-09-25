import React, { Fragment, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import { createRootComment } from "../comment/commentSlice";

const CommentForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const currentPost = useAppSelector((state) => state.post.post);
  const [commentEditorState, setCommentEditorState] = useState<string>("");
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

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      //dispatch failure alert
      return history.push("/login");
    }
    dispatch(
      createRootComment({ slug: currentPost.slug, content: commentEditorState })
    );
    //dispatch success alert
  };
  return (
    <Fragment>
      <div className="comment-main">
        <h4 className="comment-section-heading">{`Leaving a comment on: ${currentPost.title}`}</h4>
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
          <button
            type="button"
            className="btn btn-action btn-comment"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CommentForm;
