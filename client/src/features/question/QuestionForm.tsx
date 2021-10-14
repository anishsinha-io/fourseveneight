import React, { Fragment, useState, useContext } from "react";

import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import JSSoup from "jssoup";

import RichTextEditor, { EditorContext } from "../editor/RichTextEditor";
import { createQuestion, INewQuestion } from "./questionSlice";
import validateQuestionForm from "../../util/validateQuestionForm";
import { useAppDispatch } from "../../app/hooks";
import Markup from "../editor/EditorApi";

const QuestionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const editorContext = useContext(EditorContext);

  const [questionFormData, setQuestionFormData] = useState<INewQuestion>({
    title: "",
    content: editorContext.content || "",
    tags: [],
    category: "",
    embeddedMediaFiles: editorContext.embeddedMediaFiles || [],
  });
  const handleAddTag = (tag: string) => {
    if (tags.length < 5) {
      setTags(() => [...tags, tag]);
      setQuestionFormData(() => {
        return { ...questionFormData, tags: [...tags, tag] };
      });
    } else return;
  };

  const handleRemoveTag = (skill: string) => {
    const newTags = tags.filter((skillItem: string) => skillItem !== skill);
    setTags(newTags);
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

  const handleQuestionFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
    const markup = new Markup(
      editorContext.content,
      editorContext.embeddedMediaFiles
    ).finalMarkup;
    let imgArray = new JSSoup(markup).findAll("img");
    imgArray = imgArray.map((imgSoup: any) =>
      imgSoup.attrs.src.split("/").pop().replace("image-fse-", "")
    );
    editorContext.embeddedMediaFiles = imgArray;
    setQuestionFormData(() => {
      return {
        ...questionFormData,
        content: editorContext.content,
        embeddedMediaFiles: editorContext.embeddedMediaFiles,
      };
    });
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(false);
  };

  const handleFinalFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateQuestionForm(questionFormData);
    if (errors.length > 0) {
      //dispatch alerts and close dialog
      console.log(errors);
      return;
    }
    console.log("here");
    // const markup = new Markup(
    //   editorContext.content,
    //   editorContext.embeddedMediaFiles
    // ).finalMarkup;
    // let imgArray = new JSSoup(markup).findAll("img");
    // imgArray = imgArray.map((imgSoup: any) =>
    //   imgSoup.attrs.src.split("/").pop().replace("image-fse-", "")
    // );

    // editorContext.embeddedMediaFiles = imgArray;
    console.log(editorContext.embeddedMediaFiles);
    dispatch(createQuestion(questionFormData));
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
            value={tags}
            newChipKeys={["Enter"]}
            onAdd={handleAddTag}
            onDelete={handleRemoveTag}
            allowDuplicates={false}
            blurBehavior="clear"
            placeholder="Add tags to your question"
            fullWidthInput={true}
            variant="standard"
            helperText="Enter between 1 and 5 skills"
            fullWidth={true}
            onKeyPress={suppressSubmitOnEnter}
          />
        </div>
        <RichTextEditor />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleQuestionFormSubmit}
        >
          Submit
        </button>
        {showConfirmDialog && (
          <Dialog open={true} onClose={handleDialogClose}>
            <div className="question-dialog">
              <h3 className="question-dialog__title">Confirm submit?</h3>
              <div className="question-dialog__actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleFinalFormSubmit}
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
