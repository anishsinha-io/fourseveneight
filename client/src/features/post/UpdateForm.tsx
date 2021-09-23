import React, { Fragment, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

const UpdateForm = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {});
  const post = useAppSelector((state) => state.post.post);
  const postAuthor = post.author;
  return <Fragment></Fragment>;
};

export default UpdateForm;
