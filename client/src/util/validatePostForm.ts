import { INewPost } from "../components/post/postSlice";

const validatePostForm = (postFormData: INewPost) => {
  const errors: string[] = [];
  const { image, imageAlt, summary, content, title, tags, category } =
    postFormData;

  if (
    !image ||
    !imageAlt ||
    !summary ||
    !content ||
    !tags ||
    !category ||
    !title ||
    content === "<div><div><p></p></div></div>"
  )
    errors.push("Please fill out all required fields");

  const allowedCategories = [
    "Computer science",
    "History",
    "Entertainment",
    "Mathematics",
    "Politics",
    "Public health",
    "Economics",
    "Linguistics",
    "Law",
    "Music",
    "Sports",
    "Philosophy",
    "Environment",
    "Food and drink",
    "Education",
    "Universe",
    "Art",
    "Finance",
    "Engineering",
  ];

  if (!allowedCategories.includes(category)) {
    errors.push("Please choose a valid category");
  }

  return errors;
};

export default validatePostForm;
