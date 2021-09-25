import React, { Fragment } from "react";

import Comment from "./Comment";
import { useAppSelector } from "../../app/hooks";
import { IComment } from "./commentSlice";
import Spinner from "../spinner/Spinner";

const Comments: React.FC<{ root?: boolean }> = (props) => {
  const { root } = props;

  const status = useAppSelector((state) =>
    root ? state.post.status : state.comment.status
  );

  const comments: IComment[] = useAppSelector((state) =>
    root ? state.post.post.rootComments : state.comment.comments
  );

  console.log(comments);

  if (status === "loading") return <Spinner />;
  const finalComments = (comments: IComment[]) => {
    return comments.map((comment: IComment) => (
      <Comment key={comment._id} comment={comment} />
    ));
  };
  return (
    <Fragment>
      <div className="comments-container">{finalComments(comments)}</div>
    </Fragment>
  );
};

export default Comments;
