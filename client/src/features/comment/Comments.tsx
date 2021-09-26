import React, { Fragment } from "react";

import Comment from "./Comment";
import { IComment } from "./commentSlice";

const Comments: React.FC<{ root?: boolean; comments?: IComment[] }> = (
  props
) => {
  const { comments } = props;
  const length = comments?.length || 0;

  return (
    <Fragment>
      <div className="comments-container">
        {length !== 0 &&
          comments?.map((comment: IComment) => (
            <div key={comment._id}>
              <Comment comment={comment} />
              <Comments comments={comment.directChildComments} />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Comments;
