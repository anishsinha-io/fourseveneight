import React, { Fragment, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import {
  createRootComment,
  createChildComment,
  toggleReplyingToComment,
} from "../comment/commentSlice";

const CommentForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const currentPost = useAppSelector((state) => state.post.post);
  const currentComment = useAppSelector((state) => state.comment.comment);
  const replyingToComment = useAppSelector(
    (state) => state.comment.replyingToComment
  );
  const status = useAppSelector((state) => state.comment.status);
  let currentCommentString;
  if (Object.keys(currentComment).includes("content") && status === "idle") {
    currentCommentString = `${currentComment.content.slice(0, 15)}... by ${
      currentComment.author
    }`;
  }
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
    try {
      e.preventDefault();

      if (!isAuthenticated) {
        //dispatch failure alert
        return history.push("/login");
      }
      if (replyingToComment) {
        console.log("replying to comment");
        dispatch(
          createChildComment({
            content: commentEditorState,
            _id: currentComment._id,
          })
        );
      } else
        dispatch(
          createRootComment({
            slug: currentPost.slug,
            content: commentEditorState,
          })
        );
      //dispatch success alert
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <div className="comment-main">
        <h4 className="comment-section-heading">{`Leaving a comment on: ${
          currentCommentString || currentPost.title
        }`}</h4>
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
