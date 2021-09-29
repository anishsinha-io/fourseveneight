import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { IPost } from "./postSlice";

const PostItem: React.FC<{ post: IPost }> = (props) => {
  const { post } = props;
  const history = useHistory();

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    return history.push(`/post/${post.slug}`);
  };
  return (
    <Fragment>
      <div className="post-container">
        <div className="post-container__image">
          <img
            src={`http://localhost:8000/api/posts/downloads/image/${post.image}`}
            alt={post.imageAlt}
          />
        </div>
        <div className="post-container__title" onClick={handleTitleClick}>
          <h3>{post.title}</h3>
        </div>
        <div className="post-container__author">{post.author}</div>
        <div className="post-container__summary">
          <em>{post.summary}</em>
        </div>
        <div className="post-container__meta">
          {new Date(`${post.date}`).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default PostItem;
