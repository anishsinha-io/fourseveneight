import { Fragment, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { MathComponent } from "mathjax-react";
import Gist from "super-react-gist";

import { loadQuestion } from "./questionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Preprocessor, { JsxParserDefaultProps } from "../editor/Preprocessor";
import Spinner from "../spinner/Spinner";
import JsxParser from "react-jsx-parser";

const Question = ({ match }: RouteComponentProps<{ questionId?: string }>) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.question.status);
  const question = useAppSelector((state) => state.question.question);

  useEffect(() => {
    if (match.params.questionId) {
      console.log(match.params.questionId);
      dispatch(loadQuestion(match.params.questionId));
    }
  }, [dispatch, match.params.questionId]);

  if (!question.content) {
    return (
      <Fragment>
        <div>Question not found!</div>
      </Fragment>
    );
  }

  const finalMarkup = new Preprocessor(question.content).generateFinalMarkup();

  if (status === "loading") return <Spinner />;

  return (
    <Fragment>
      <div className="question-page">
        <div className="question-page__title">
          <h1>{question.title}</h1>
        </div>
        <div className="question-page__meta">
          <ul className="meta__list">
            <li className="meta__list-item">{question.author}</li>
            <li className="meta__list-item">
              {new Date(`${question.date}`).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
          </ul>
        </div>
        <JsxParser
          {...JsxParserDefaultProps}
          components={{ MathComponent, Gist }}
          jsx={`<div>${finalMarkup}</div>`}
          className="question-content"
        />
      </div>
    </Fragment>
  );
};

export default Question;
