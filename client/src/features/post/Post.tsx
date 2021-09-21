import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadPost } from "./postSlice";
import { RouteComponentProps } from "react-router";
import Markup from "./postAPI";
import JsxParser from "react-jsx-parser";
import { MathComponent } from "mathjax-react";
import Spinner from "../spinner/Spinner";

const Post = ({ match }: RouteComponentProps<{ slug?: string }>) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post.post);
  const status = useAppSelector((state) => state.post.status);
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
  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="post-image"></div>
      <div className="post-title">{post.title}</div>
      <div className="post-meta">
        <ul>
          <li>{post.author}</li>
          <li>
            {new Date(`${post.date}`).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
        </ul>
      </div>
      <JsxParser
        components={{ MathComponent }}
        jsx={display.finalMarkup}
        className="post-content"
      />
      <div className="post-data">
        <ul>
          <li>{post.likes}</li>
          <li>{post.comments?.length}</li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Post;
