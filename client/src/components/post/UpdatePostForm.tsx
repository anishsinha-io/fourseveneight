import { Fragment, useEffect, useState, useContext } from "react";
import { RouteComponentProps, Redirect } from "react-router";

import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loadPost, INewPost, updatePost } from "./postSlice";
import Spinner from "../spinner/Spinner";
import RichTextEditor, { EditorContext } from "../editor/RichTextEditor";

const UpdatePostForm = ({ match }: RouteComponentProps<{ slug?: string }>) => {
  const dispatch = useAppDispatch();
  const editorContext = useContext(EditorContext);
  useEffect(() => {
    if (match.params.slug) {
      dispatch(loadPost(match.params?.slug));
    }
    //dispatch alert
  }, [dispatch, match.params.slug]);

  const status = useAppSelector((state) => state.post.status);
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const post = useAppSelector((state) => state.post.post);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [postFormData, setPostFormData] = useState<INewPost>({
    slug: post.slug,
    title: post.title,
    image: null,
    imageAlt: post.imageAlt,
    summary: post.summary,
    content: editorContext.content,
    tags: post.tags,
    category: post.category,
  });
  useEffect(() => {
    setPostFormData((prevPostFormData) => {
      return {
        ...prevPostFormData,
        slug: post.slug,
        title: post.title,
        tags: post.tags,
        category: post.category,
        summary: post.summary,
        imageAlt: post.imageAlt,
      };
    });
  }, [post]);

  const handleAddTag = (tag: string) => {
    if (postFormData.tags.length < 5) {
      setPostFormData(() => {
        return { ...postFormData, tags: [...postFormData.tags, tag] };
      });
    }
    return;
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = postFormData.tags.filter(
      (tagItem: string) => tagItem !== tag
    );
    setPostFormData(() => {
      return { ...postFormData, tags: newTags };
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageUrl(objectURL);
      setPostFormData(() => {
        return { ...postFormData, image: file };
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostFormData(() => {
      return { ...postFormData, category: e.target.value };
    });
  };

  const handlePostTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostFormData(() => {
      return { ...postFormData, title: e.target.value };
    });
  };

  const handlePostSummaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostFormData(() => {
      return { ...postFormData, summary: e.target.value };
    });
  };
  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostFormData(() => {
      return { ...postFormData, imageAlt: e.target.value };
    });
  };

  const handlePreviewSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
    setPostFormData(() => {
      return {
        ...postFormData,
        content: editorContext.content,
      };
    });
  };

  const handleFinalSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(false);
    console.log(postFormData);
    dispatch(updatePost(postFormData));
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmDialog(false);
  };

  const handleSuppressSubmitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.key === "Enter" && e.preventDefault();
  };

  if (status === "loading" || !post.user) return <Spinner />;

  if (!post.user && status === "idle") return <div>Post not found!</div>;

  if (currentUser !== post.user) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <div className="post-main">
        <h3 className="post-main__heading">
          Updating <em>{post.title}</em>
        </h3>
        <div className="post-main__form">
          <div className="form__title">
            <Box component="form" noValidate autoComplete="off">
              <TextField
                required={true}
                label="Your post title"
                variant="standard"
                onKeyPress={handleSuppressSubmitOnEnter}
                multiline={true}
                minRows={1}
                maxRows={4}
                fullWidth={true}
                placeholder="Add as many details as you can"
                onChange={handlePostTitleChange}
                value={postFormData.title}
              />
            </Box>
          </div>
          <div className="form__summary">
            <Box component="form" noValidate autoComplete="off">
              <TextField
                required={true}
                label="Your post summary"
                variant="standard"
                onKeyPress={handleSuppressSubmitOnEnter}
                multiline={true}
                minRows={1}
                maxRows={4}
                fullWidth={true}
                placeholder="Add as many details as you can"
                onChange={handlePostSummaryChange}
                value={postFormData.summary}
              />
            </Box>
          </div>
          <div className="form__category">
            <Box>
              <FormControl fullWidth>
                <InputLabel variant="standard" required={true}>
                  Category
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "Category",
                  }}
                  onChange={handleCategoryChange}
                  value={postFormData.category}
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
          <div className="form__tags">
            <ChipInput
              required={true}
              value={postFormData.tags}
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
              onKeyPress={handleSuppressSubmitOnEnter}
            />
          </div>
          <div className="form__meta">
            <div className="form__meta--file file-input">
              <label htmlFor="file-input">
                {!imageUrl && <em>* Cover Image: </em>}
                {imageUrl && <em>Preview: </em>}
              </label>
              {imageUrl && (
                <img
                  className="file-input__image"
                  src={imageUrl || ""}
                  alt={postFormData.imageAlt || ``}
                />
              )}
              <input type="file" onChange={handleFileSelect} />
              <span className="button">Choose</span>
              <span className="label">
                {postFormData.image
                  ? postFormData.image.name
                  : "No file selected"}
              </span>
            </div>
            <div className="form__imagealt">
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  required={true}
                  label="Your image alt"
                  variant="standard"
                  onKeyPress={handleSuppressSubmitOnEnter}
                  multiline={true}
                  minRows={1}
                  maxRows={4}
                  fullWidth={true}
                  placeholder="Describe your image in a few words"
                  onChange={handleImageAltChange}
                  value={postFormData.imageAlt}
                />
              </Box>
            </div>
          </div>
        </div>

        <RichTextEditor content={post.content} />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handlePreviewSubmit}
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

export default UpdatePostForm;
