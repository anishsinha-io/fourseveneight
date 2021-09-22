import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadPost } from "./postSlice";
import { RouteComponentProps } from "react-router";
import Markup from "./postAPI";
import JsxParser from "react-jsx-parser";
import { MathComponent } from "mathjax-react";
import JsxParserDefaultProps from "./postAPI";
import Gist from "super-react-gist";

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

  //todo change to 404 page
  if (!post.content)
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
      <div className="post-page">
        <div className="post-image">
          <img
            src={`http://localhost:8000/api/posts/downloads/image/${post.image}`}
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
        <JsxParser
          components={{ MathComponent, Gist }}
          jsx={display.finalMarkup}
          className="post-content"
          {...JsxParserDefaultProps}
        />
        <div className="post-data">
          <ul>
            <li>{post.likes}</li>
            <li>{post.comments?.length}</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Post;
