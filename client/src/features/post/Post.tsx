import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadPost } from "./postSlice";
import { useParams, RouteComponentProps } from "react-router";
import Markup from "./postAPI";

const Post = ({ match }: RouteComponentProps<{ slug?: string }>) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post.post);
  console.log(match.params?.slug);
  useEffect(() => {
    if (match.params.slug) {
      dispatch(loadPost(match.params?.slug));
    }
    //dispatch alert
  }, [dispatch, match.params.slug]);
  if (!post)
    return (
      <Fragment>
        <div>Post not found!</div>
      </Fragment>
    );

  const display = new Markup(post.content);

  return (
    <Fragment>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </Fragment>
  );
};

export default Post;
