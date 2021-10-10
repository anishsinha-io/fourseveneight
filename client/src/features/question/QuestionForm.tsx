import React, { Fragment, useState, useContext } from "react";

import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Dialog from "@mui/material/Dialog";

import RichTextEditor, { EditorContext } from "../editor/RichTextEditor";
import { INewQuestion } from "./questionSlice";

const QuestionForm: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const editorContext = useContext(EditorContext);

  const [questionFormData, setQuestionFormData] = useState<INewQuestion>({
    content: editorContext.content || "",
    tags: [],
    category: "",
    embeddedMediaFiles: editorContext.embeddedMediaFiles || [],
  });

  const handleAddTag = (tag: string) => {
    if (tags.length < 5) {
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
    setCategory(() => e.target.value);
    setQuestionFormData(() => {
      return { ...questionFormData, category: category };
    });
  };

  const handleQuestionFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
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

  return (
    <Fragment>
      <div className="question-form">
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
        <RichTextEditor featureType="question" />

        <button
          className="btn btn-action"
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
                  className="pure-material-button-contained"
                  type="button"
                  onClick={() => console.log(editorContext)}
                >
                  Confirm
                </button>
                <button
                  className="pure-material-button-contained"
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
