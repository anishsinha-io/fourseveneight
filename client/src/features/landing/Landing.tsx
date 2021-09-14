import React, { Fragment, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAndLoadPosts } from "../post/postSlice";
import PostItem from "../post/PostItem";
import { db } from "../../App";
import Spinner from "../spinner/Spinner";

const Landing: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostsFromClientDB = async () => {
      try {
        // setLoading(true);
        const posts = await db.table("posts").toArray();
        console.log(posts);
        setData(posts);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostsFromClientDB();
  }, [loading]);

  let postItems;

  if (loading) {
    return <Spinner />;
  }
  postItems = data.map((post: any) => <PostItem key={post.slug} post={post} />);
  return <Fragment>{postItems}</Fragment>;
};

export default Landing;
