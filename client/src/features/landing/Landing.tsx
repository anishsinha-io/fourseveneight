import React, { Fragment } from "react";
import FileUploader from "../../util/FileUploader";
import PostEditor from "../editor/TextEditor";

const Landing: React.FC = () => {
  return (
    <Fragment>
      <PostEditor />
    </Fragment>
  );
};

export default Landing;
