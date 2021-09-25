import React, { Fragment } from "react";

import { IComment } from "./commentSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Comment: React.FC<{ comment: IComment }> = (props) => {
  return (
    <Fragment>
      <div className="comment-container">
        <div className="comment-container__image">Profile would go here</div>
        <div className="comment-container__content">
          {props.comment.content}Example content
        </div>
        <div className="comment-container__meta">
          <div>Comment date, likes, reply count</div>
          <button type="button" className="btn btn-action">
            Reply
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Comment;
