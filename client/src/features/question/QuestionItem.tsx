import React, { Fragment } from "react";

import { IQuestion } from "./questionSlice";

const QuestionItem: React.FC<{
  question: IQuestion;
  showActionButtons: boolean;
}> = (props) => {
  // const { question, showActionButtons } = props;
  return (
    <Fragment>
      <div className="question-container"></div>
    </Fragment>
  );
};

export default QuestionItem;
