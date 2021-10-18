import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";

import { IPost, deletePost } from "./postSlice";
import { useAppDispatch } from "../../app/hooks";

const PostItem: React.FC<{
  post: IPost;
  showImage: boolean;
  showActionButtons?: boolean;
}> = (props) => {
  const { post, showImage, showActionButtons } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    return history.push(`/post/${post.slug}`);
  };

  const handleChipClick = (e: any) => {
    e.preventDefault();
    console.log(e.target.outerText);
  };

  const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return history.push(`/update/${post.slug}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDelete(true);
  };

  const handleConfirmDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deletePost(post.slug));
    return history.go(0);
  };

  const displayedChips = post.tags.map((tag: string) => (
    <Chip key={tag} label={tag} onClick={handleChipClick} />
  ));

  return (
    <Fragment>
      <div className="post-container">
        {showImage && (
          <div className="post-container__image">
            <img
              src={`http://localhost:8000/api/media/image/${post.image}`}
              alt={post.imageAlt}
            />
          </div>
        )}
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
        {showActionButtons && (
          <div className="post-container__buttons">
            <button
              type="button"
              className="btn btn-update post-button"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            {!showConfirmDelete && (
              <button
                type="button"
                className="btn btn-danger post-button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
            {showConfirmDelete && (
              <button
                type="button"
                className="btn btn-danger post-button"
                onClick={handleConfirmDeleteClick}
              >
                Confirm
              </button>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PostItem;
