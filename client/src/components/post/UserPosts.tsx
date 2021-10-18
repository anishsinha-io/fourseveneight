import React, { Fragment } from "react";

import { useAppSelector } from "../../app/hooks";
import PostItem from "./PostItem";
import { IPost } from "./postSlice";

const UserPosts: React.FC<{ userId: string }> = (props) => {
  const { userId } = props;
  const userPosts = useAppSelector((state) => state.post.userPosts);

  const currentUser = useAppSelector((state) => state.auth.user);

  const userPostItems = userPosts.map((post: IPost) => (
    <div className="post-profile">
      <PostItem
        key={post._id}
        post={post}
        showImage={false}
        showActionButtons={
          currentUser && currentUser._id === userId ? true : false
        }
      />
    </div>
  ));

  return (
    <Fragment>
      <div className="userposts-main">{userPostItems}</div>
    </Fragment>
  );
};

export default UserPosts;
