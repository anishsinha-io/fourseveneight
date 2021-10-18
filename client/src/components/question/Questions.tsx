import React, { Fragment, useEffect } from "react";

import QuestionItem from "./QuestionItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadQuestions, IQuestion } from "./questionSlice";

const Questions: React.FC = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector((state) => state.question.questions);

  useEffect(() => {
    dispatch(loadQuestions);
  }, [dispatch]);

  if (questions.length < 1)
    return (
      <Fragment>
        <div>No questions found</div>
      </Fragment>
    );

  console.log(questions);
  const questionItems = questions.map((question: IQuestion) => (
    <QuestionItem
      key={question._id}
      question={question}
      showActionButtons={false}
    />
  ));
  return (
    <Fragment>
      <div className="questions-container">{questionItems}</div>
    </Fragment>
  );
};

export default Questions;
