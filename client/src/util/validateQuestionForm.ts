import { INewQuestion } from "../components/question/questionSlice";

//An empty editor will output '<div><div><p></p></div></div>', so this is the equivalent of typing nothing

const validateQuestionForm = (questionForm: INewQuestion): string[] => {
  const errors: string[] = [];
  const { content, category, tags, title } = questionForm;
  console.log(category);
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
  if (
    !title ||
    !category ||
    !tags ||
    !content ||
    content === "<div><div><p></p></div></div>" ||
    category === " -- select an option -- "
  ) {
    errors.push("Please fill out all fields to proceed");
  }
  if (!allowedCategories.includes(category)) {
    errors.push("Please choose a valid category");
  }
  return errors;
};

export default validateQuestionForm;
