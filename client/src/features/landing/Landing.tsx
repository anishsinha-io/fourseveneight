import React, { Fragment, useEffect, useState } from "react";

import PostItem from "../post/PostItem";
import { db } from "../../App";
import Spinner from "../spinner/Spinner";
import { useAppDispatch } from "../../app/hooks";
import { setAlert } from "../alert/alertSlice";

const Landing: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPostsFromClientDB = async () => {
      try {
        const posts = await db.table("posts").toArray();
        setData(posts);
        setLoading(false);
      } catch (err) {
        dispatch(setAlert("Error loading posts", "danger"));
      }
    };
    fetchPostsFromClientDB();
  }, [loading, dispatch]);

  let postItems;

  if (loading) {
    return <Spinner />;
  }
  postItems = data.map((post: any) => <PostItem key={post.slug} post={post} />);
  return <Fragment>{postItems}</Fragment>;
};

export default Landing;
