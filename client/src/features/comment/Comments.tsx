import React, { Fragment } from "react";

import Comment from "./Comment";
import { IComment } from "./commentSlice";

const Comments: React.FC<{ comments: IComment[] }> = (props) => {
  const { comments } = props;
  const length = comments.length;
  console.log(length);

  return (
    <Fragment>
      {length > 0 &&
        comments.length > 0 &&
        comments.map((comment: IComment) => (
          <div className="comments-container">
            <div key={comment._id}>
              <Comment comment={comment} />
              <Comments comments={comment.directChildComments!} />
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default Comments;
