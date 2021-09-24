import React, { Fragment, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadPost } from "./postSlice";
import Spinner from "../spinner/Spinner";
import TextEditor from "../editor/TextEditor";

const UpdateForm = ({ match }: RouteComponentProps<{ slug?: string }>) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (match.params.slug) {
      dispatch(loadPost(match.params?.slug));
    }
    //dispatch alert
  }, [dispatch, match.params.slug]);

  const status = useAppSelector((state) => state.post.status);
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const post = useAppSelector((state) => state.post.post);

  console.log(match.params);

  console.log(currentUser, post);

  console.log(currentUser === post.user);

  if (status === "loading") return <Spinner />;

  if (!post.user && status === "idle") return <Spinner />;

  if (currentUser !== post.user) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <TextEditor updateMode={true} />
    </Fragment>
  );
};

export default UpdateForm;
