import React, { Fragment, useState } from "react";

import { IComment, setComment, toggleReplyingToComment } from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Comment: React.FC<{ comment: IComment }> = (props) => {
  const { comment } = props;
  const dispatch = useAppDispatch();

  const replyingToComment: boolean = useAppSelector(
    (state) => state.comment.replyingToComment
  );

  const replyButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleReplyingToComment());
    if (!replyingToComment) dispatch(setComment(comment));
    else dispatch(setComment({} as IComment));
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
        <button type="button" className="reply reply-btn">
          View Replies
        </button>
        <button
          type="button"
          className={`reply reply-btn ${
            replyingToComment && "reply-highlight"
          }`}
          onClick={replyButtonHandler}
        >
          Reply
        </button>
      </div>
    </Fragment>
  );
};

export default Comment;
