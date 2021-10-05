import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";

import { IPost } from "./postSlice";

const PostItem: React.FC<{ post: IPost }> = (props) => {
  const { post } = props;
  const history = useHistory();

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    return history.push(`/post/${post.slug}`);
  };

  const handleChipClick = (e: any) => {
    e.preventDefault();
    console.log(e.target.outerText);
  };

  const displayedChips = post.tags.map((tag: string) => (
    <Chip key={tag} label={tag} onClick={handleChipClick} />
  ));

  return (
    <Fragment>
      <div className="post-container">
        <div className="post-container__image">
          <img
            src={`http://localhost:8000/api/media/image/${post.image}`}
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
        <div className="post-container__chips">{displayedChips}</div>
      </div>
    </Fragment>
  );
};

export default PostItem;
