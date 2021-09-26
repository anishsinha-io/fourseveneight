import React, { Fragment, useState } from "react";
import Comments from "./Comments";

import {
  IComment,
  setComment,
  toggleReplyingToComment,
  loadChildComments,
} from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Comment: React.FC<{ comment: IComment }> = (props) => {
  const { comment } = props;
  const dispatch = useAppDispatch();

  console.log(comment);

  const replyingToComment: boolean = useAppSelector(
    (state) => state.comment.replyingToComment
  );

  const replyButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setComment(comment));
    dispatch(toggleReplyingToComment());
  };

  return (
    <Fragment>
      <div className="comment-container">
        <div className="comment-container__image">Profile would go here</div>
        <div className="comment-container__content">
          {comment.content}Example content
        </div>
      </div>
      <div className="comment-meta">
        <div className="comment-meta__date">
          {new Date(`${comment.date}`).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
        <button
          type="button"
          className={`reply reply-btn ${
            replyingToComment && "reply-highlight"
          }`}
          onClick={replyButtonHandler}
        >
          Reply
        </button>
        <div className="comment-container">
          {/* {<Comments comments={comment.directChildComments} />} */}
        </div>
      </div>
    </Fragment>
  );
};

export default Comment;
