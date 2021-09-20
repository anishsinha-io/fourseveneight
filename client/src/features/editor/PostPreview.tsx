import React, { Fragment } from "react";
import { MathComponent } from "mathjax-react";

import Preview from "./editorAPI";

const PostPreview: React.FC<{ html: string }> = (props) => {
  const postHtml = new Preview(props.html);

  const jaxComponents = postHtml.latexArray.forEach((latex: string) => {
    latex = latex.replace("`", "");
    return <MathComponent tex={latex} />;
  });

  return <Fragment>{jaxComponents}asdf</Fragment>;
};

export default PostPreview;
