import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostItem from "./PostItem";
import { getUserPosts, IPost } from "./postSlice";
import Spinner from "../spinner/Spinner";

const UserPosts: React.FC<{ userId: string }> = (props) => {
  const dispatch = useAppDispatch();
  const userPosts = useAppSelector((state) => state.post.userPosts);
  const { userId } = props;
  const status = useAppSelector((state) => state.post.status);

  useEffect(() => {
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  if (status === "loading") return <Spinner />;

  const userPostItems = userPosts.map((post: IPost) => (
    <div className="post-profile">
      <PostItem key={post._id} post={post} showImage={false} />
      {post.user === userId && (
        <div className="post-profile__buttons">
          <Button color="secondary">Update</Button>
        </div>
      )}
    </div>
  ));

  return (
    <Fragment>
      <div className="userposts-main">{userPostItems}</div>
    </Fragment>
  );
};

export default UserPosts;
