import React, { Fragment } from "react";

import { IPost } from "./postSlice";

const PostItem: React.FC<{ post: IPost }> = (props) => {
  return (
    <Fragment>
      <div className="post-container">
        <div>Title: {props.post.title}</div>
        <div>{props.post.content}</div>
      </div>
    </Fragment>
  );
};

export default PostItem;
