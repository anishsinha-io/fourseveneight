import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router";
import JsxParser from "react-jsx-parser";

import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { MathComponent } from "mathjax-react";
import Gist from "super-react-gist";

import RichTextEditor, { EditorContext } from "../editor/RichTextEditor";
import { createQuestion, INewQuestion } from "./questionSlice";
import validateQuestionForm from "../../util/validateQuestionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Preprocessor, { JsxParserDefaultProps } from "../editor/Preprocessor";

const QuestionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState<boolean>(false);
  const [previewMarkup, setPreviewMarkup] = useState<string>("");
  const editorContext = useContext(EditorContext);

  const user = useAppSelector((state) => state.auth.user);

  const [questionFormData, setQuestionFormData] = useState<INewQuestion>({
    title: "",
    content: editorContext.content,
    tags: [],
    category: "",
  });
  const handleAddTag = (tag: string) => {
    if (questionFormData.tags.length < 5) {
      setQuestionFormData(() => {
        return { ...questionFormData, tags: [...questionFormData.tags, tag] };
      });
    } else return;
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = questionFormData.tags.filter(
      (tagItem: string) => tagItem !== tag
    );

    setQuestionFormData(() => {
      return { ...questionFormData, tags: newTags };
    });
  };

  const suppressSubmitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && e.preventDefault();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setQuestionFormData(() => {
      return { ...questionFormData, category: e.target.value };
    });
  };

  const handlePreviewSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);

    setQuestionFormData(() => {
      return {
        ...questionFormData,
        content: editorContext.content,
      };
    });
  };

  const handleShowPreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreviewMarkup(() => {
      const processedMarkup = new Preprocessor(
        editorContext.content
      ).generateFinalMarkup();
      return processedMarkup;
    });
    setShowPreviewDialog(true);
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(false);
    setShowPreviewDialog(false);
  };

  const handleFinalSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateQuestionForm(questionFormData);
    if (errors.length > 0) {
      //dispatch alerts and close dialog
      console.log(errors);
      return;
    }
    dispatch(createQuestion(questionFormData));
    history.push("/");
  };

  const handleQuestionTitleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setQuestionFormData(() => {
      return { ...questionFormData, title: e.target.value };
    });
  };

  return (
    <Fragment>
      <div className="question-form">
        <div className="question-form__title">
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Question"
              variant="standard"
              onKeyPress={suppressSubmitOnEnter}
              multiline={true}
              minRows={1}
              maxRows={4}
              fullWidth={true}
              placeholder="Add as many details as you can"
              onChange={handleQuestionTitleChange}
            />
          </Box>
        </div>
        <div className="question-form__category">
          <Box>
            <FormControl fullWidth>
              <InputLabel variant="standard">Category</InputLabel>
              <NativeSelect
                inputProps={{
                  name: "Category",
                }}
                onChange={handleCategoryChange}
              >
                <option> -- select an option -- </option>
                <option>Computer science</option>
                <option>History</option>
                <option>Entertainment</option>
                <option>Mathematics</option>
                <option>Politics</option>
                <option>Public health</option>
                <option>Economics</option>
                <option>Linguistics</option>
                <option>Law</option>
                <option>Music</option>
                <option>Sports</option>
                <option>Philosophy</option>
                <option>Environment</option>
                <option>Food and drink</option>
                <option>Education</option>
                <option>Universe</option>
                <option>Art</option>
                <option>Finance</option>
                <option>Engineering</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
        <div className="question-form__tags">
          <ChipInput
            value={questionFormData.tags}
            newChipKeys={["Enter"]}
            onAdd={handleAddTag}
            onDelete={handleRemoveTag}
            allowDuplicates={false}
            blurBehavior="clear"
            placeholder="Add tags to your question"
            fullWidthInput={true}
            variant="standard"
            helperText="Enter between 1 and 5 tags"
            fullWidth={true}
            onKeyPress={suppressSubmitOnEnter}
          />
        </div>
        <RichTextEditor />
        <div className="question-form__actionbuttons">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePreviewSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleShowPreview}
          >
            Preview
          </button>
        </div>
        {showPreviewDialog && (
          <Dialog
            open={true}
            onClose={handleDialogClose}
            maxWidth="xl"
            fullWidth
          >
            <div className="question-preview">
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleDialogClose}
              >
                Close Preview
              </button>
              <h2 className="question-preview__title">
                <strong>Preview</strong>
              </h2>

              <div className="question-preview__meta">
                <ul className="question-meta__list">
                  <li className="question-meta__list--item">{`${user.firstName} ${user.lastName}`}</li>
                  <li className="question-meta__list--item">
                    {new Date(Date.now()).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                </ul>
              </div>
              {(editorContext.content && (
                <JsxParser
                  {...JsxParserDefaultProps}
                  components={{ MathComponent, Gist }}
                  jsx={`<div>${previewMarkup}</div>`}
                />
              )) || (
                <div className="question-preview__nocontent">
                  <em>Start writing to see a preview</em>
                </div>
              )}
            </div>
          </Dialog>
        )}
        {showConfirmDialog && (
          <Dialog open={true} onClose={handleDialogClose}>
            <div className="question-dialog">
              <h3 className="question-dialog__title">Confirm submit?</h3>
              <div className="question-dialog__actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleFinalSubmit}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </Fragment>
  );
};

export default QuestionForm;
