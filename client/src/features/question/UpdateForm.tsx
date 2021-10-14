import { Fragment, useEffect, useContext, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import JSSoup from "jssoup";

import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadQuestion, editQuestion, INewQuestion } from "./questionSlice";
import validateQuestionForm from "../../util/validateQuestionForm";
import Spinner from "../spinner/Spinner";
import RichTextEditor, {
  IEditorContext,
  EditorContext,
} from "../editor/RichTextEditor";
import Markup from "../editor/EditorApi";

const UpdateForm = ({
  match,
}: RouteComponentProps<{ questionId?: string }>) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (match.params.questionId) {
      dispatch(loadQuestion(match.params?.questionId));
    }
    //dispatch alert
  }, [dispatch, match.params.questionId]);

  const status = useAppSelector((state) => state.question.status);
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const question = useAppSelector((state) => state.question.question);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const editorContext = useContext(EditorContext);

  const [questionFormData, setQuestionFormData] = useState<INewQuestion>({
    title: question.title,
    content: editorContext.content,
    tags: question.tags,
    category: question.category,
    embeddedMediaFiles: editorContext.embeddedMediaFiles,
  });

  useEffect(() => {
    setQuestionFormData((prevQuestionFormData) => {
      return {
        ...prevQuestionFormData,
        title: question.title,
        tags: question.tags,
        category: question.category,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const handleAddTag = (tag: string) => {
    if (questionFormData.tags.length < 5) {
      setQuestionFormData(() => {
        return { ...questionFormData, tags: [...questionFormData.tags, tag] };
      });
    }
    return;
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = questionFormData.tags.filter(
      (tagItem: string) => tagItem !== tag
    );

    setQuestionFormData(() => {
      return { ...questionFormData, tags: newTags };
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setQuestionFormData(() => {
      return { ...questionFormData, category: e.target.value };
    });
  };

  const suppressSubmitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && e.preventDefault();
  };

  const handleQuestionTitleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setQuestionFormData(() => {
      return { ...questionFormData, title: e.target.value };
    });
  };

  const handleQuestionFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
    const markup = new Markup(
      editorContext.content,
      editorContext.embeddedMediaFiles
    ).finalMarkup;
    console.log(markup);
    console.log(editorContext.content);
    console.log(editorContext.embeddedMediaFiles);
    let imgArray = new JSSoup(markup).findAll("img");
    imgArray = imgArray.map((imgSoup: any) =>
      imgSoup.attrs.src.split("/").pop().replace("image-fse-", "")
    );
    console.log("imgArray pre-filter", imgArray);
    imgArray = imgArray.filter((img: string) =>
      editorContext.embeddedMediaFiles.includes(img)
    );
    console.log(imgArray);
    console.log(editorContext.embeddedMediaFiles);
    editorContext.embeddedMediaFiles = imgArray;
    // console.log("imgarray", imgArray);
    // console.log(editorContext.embeddedMediaFiles);

    setQuestionFormData((prevQuestionFormData) => {
      return {
        ...prevQuestionFormData,
        content: editorContext.content,
        embeddedMediaFiles: imgArray,
      };
    });

    setQuestionFormData((prevQuestionFormData) => {
      return {
        ...prevQuestionFormData,
        content: editorContext.content,
        embeddedMediaFiles: imgArray,
      };
    });
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(false);
  };

  const handleTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(questionFormData);
  };

  const handleFinalFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateQuestionForm(questionFormData);
    if (errors.length > 0) {
      //dispatch alerts and close dialog
      console.log(errors);
      return;
    }
    console.log(questionFormData);
    dispatch(
      editQuestion({
        user: question.user,
        ...questionFormData,
        _id: question._id,
        author: question.author,
        date: question.date,
      })
    );
  };

  if (status === "loading" || !question.user) return <Spinner />;
  if (!question.title && status === "idle")
    return <div>Question not found!</div>;

  if (currentUser !== question.user) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <div className="questionupdate-container">
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
              value={questionFormData.title}
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
                value={questionFormData.category}
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
        <RichTextEditor
          updateMode={true}
          object={
            {
              content: question.content,
              embeddedMediaFiles: question.embeddedMediaFiles,
            } as IEditorContext
          }
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleQuestionFormSubmit}
        >
          Submit
        </button>
      </div>
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
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleTest}
              >
                Test
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </Fragment>
  );
};

export default UpdateForm;
