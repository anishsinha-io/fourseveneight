import React, { Fragment, useEffect } from "react";

import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAndLoadPosts } from "./postSlice";

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getAndLoadPosts());
  }, [dispatch]);

  if (posts.length < 1)
    return (
      <Fragment>
        <div>No posts found!</div>
      </Fragment>
    );

  const postItems = posts.map((post: any) => (
    <PostItem key={post.slug} post={post} showImage={true} />
  ));
  return (
    <Fragment>
      <div className="posts-container">{postItems}</div>
    </Fragment>
  );
};

export default Posts;
