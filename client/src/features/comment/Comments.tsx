import React, { Fragment } from "react";

import Comment from "./Comment";
import { useAppSelector } from "../../app/hooks";
import { IComment } from "./commentSlice";
import Spinner from "../spinner/Spinner";

const Comments: React.FC<{ root?: boolean; comments?: IComment[] }> = (
  props
) => {
  const { comments } = props;
  console.log(comments);
  const hasChildren = comments && comments.length;
  // if (comments) {
  //   const childCommentArray = comments.map(
  //     (comment: IComment) => comment.directChildComments
  //   );
  // }
  console.log(hasChildren);
  if (comments) {
    const renderedComments = comments.map((comment: IComment) => (
      <Comment key={comment._id} comment={comment} />
    ));
  }

  return (
    <Fragment>
      <div className="comments-container">
        {/* {comments &&
          comments.map((comment: IComment) => (
            <Comment key={comment._id} comment={comment} />
          ))} */}
        {hasChildren &&
          comments &&
          comments.map((comment: IComment) => (
            <Fragment>
              <Comment comment={comment} />
              <Comments comments={comment.directChildComments} />
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};

export default Comments;
