import React, { Fragment } from "react";

const Post: React.FC<{ html: any }> = (props) => {
  return (
    <Fragment>
      <div className="post-main" dangerouslySetInnerHTML={props.html}></div>
    </Fragment>
  );
};

export default Post;
