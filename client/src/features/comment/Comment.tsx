import React, { Fragment } from "react";

import { IComment, setComment } from "./commentSlice";
import { useAppDispatch } from "../../app/hooks";

const Comment: React.FC<{ comment: IComment }> = (props) => {
  const dispatch = useAppDispatch();
  const { comment } = props;

  const replyButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setComment(comment));
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
          className="reply reply-btn"
          onClick={replyButtonHandler}
        >
          Reply
        </button>
      </div>
    </Fragment>
  );
};

export default Comment;
