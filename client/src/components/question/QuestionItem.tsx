import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";

import { Chip } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";

import { useAppDispatch } from "../../app/hooks";

import { IQuestion, removeQuestion } from "./questionSlice";

const QuestionItem: React.FC<{
  question: IQuestion;
  showActionButtons: boolean;
}> = (props) => {
  const { question, showActionButtons } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    return history.push(`/question/${question._id}`);
  };

  const handleTagClick = (e: any) => {
    e.preventDefault();
    console.log(e.target.outerText);
  };

  const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return history.push(`/question/update/${question._id}`);
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDelete(() => false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDelete(() => true);
  };

  const handleFinalDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeQuestion(question._id));
    return history.push("/");
  };

  const displayedTags = question.tags.map((tag: string) => (
    <Chip key={tag} label={tag} onClick={handleTagClick} />
  ));

  return (
    <Fragment>
      <div className="question-container">
        <div className="question-container__title" onClick={handleTitleClick}>
          <h3>{question.title}</h3>
        </div>
        <div className="question-container__author">{question.author}</div>

        <div className="question-container__meta">
          {new Date(`${question.date}`).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="question-container__chips">{displayedTags}</div>
        {showActionButtons && (
          <div className="question-container__actionbuttons">
            <button
              type="button"
              className="btn btn-update"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            {showConfirmDelete && (
              <Dialog
                open={true}
                maxWidth="md"
                fullWidth
                onClose={handleDialogClose}
              >
                <div className="question-dialog">
                  <h3 className="question-dialog__title">Confirm delete?</h3>
                  <p>
                    If you click <em>DELETE</em> this question will be deleted.
                    Press <em>CANCEL</em> to exit.
                  </p>
                  <div className="question-dialog__actions">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleFinalDeleteClick}
                    >
                      Delete
                    </button>
                    <button className="btn btn-danger" type="button">
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default QuestionItem;
