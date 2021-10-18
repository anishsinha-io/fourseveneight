import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import JsxParser from "react-jsx-parser";
import { JsxParserDefaultProps } from "../editor/Preprocessor";
import { MathComponent } from "mathjax-react";
import Gist from "super-react-gist";

import { loadPost } from "./postSlice";
import { RouteComponentProps } from "react-router";
import Comments from "../comment/Comments";
import Preprocessor from "../editor/Preprocessor";

import Spinner from "../spinner/Spinner";
import CommentForm from "../comment/CommentForm";

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

  if (!post.content)
    return (
      <Fragment>
        <div>Post not found!</div>
      </Fragment>
    );

  const finalContent = new Preprocessor(post.content).generateFinalMarkup();

  if (status === "loading") {
    return <Spinner />;
  }
  return (
    <Fragment>
      <div className="post-page">
        <div className="post-image">
          <img
            className="post-image__main"
            src={`http://localhost:8000/api/media/image/${post.image}`}
            alt={post.imageAlt}
          />
        </div>
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <div className="post-meta">
          <ul className="post-meta__list">
            <li className="post-meta__list-item">{post.author}</li>
            <li className="post-meta__list-item">
              {new Date(`${post.date}`).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
          </ul>
        </div>
        <div>
          <JsxParser
            {...JsxParserDefaultProps}
            components={{ Gist, MathComponent }}
            jsx={`<div>${finalContent}</div>`}
            className="post-content"
          />
        </div>
        <div className="post-data">
          <ul>
            <li>
              <strong>Comments: {`(${post.rootComments.length})`}</strong>
            </li>
          </ul>
        </div>
        <Comments comments={post.rootComments} />
        <CommentForm />
      </div>
    </Fragment>
  );
};

export default Post;
