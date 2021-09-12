import { IRegisterData } from "../features/auth/authSlice";

export const validateInputs = (formParameters: IRegisterData): string[] => {
  const errors = [] as string[];
  const { username, password, email, passwordConfirm, firstName, lastName } =
    formParameters;
  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  if (
    !username ||
    !email ||
    !password ||
    !passwordConfirm ||
    !firstName ||
    !lastName
  ) {
    errors.push("Please fill out all required fields.");
  }
  if (!emailRegex.test(email)) errors.push("Please enter a valid email");
  if (!passwordRegex.test(password)) {
    console.log(password);
    errors.push(
      "Password must be at least eight characters, and contain at least 1 uppercase letter and character."
    );
  }
  if (password !== passwordConfirm) errors.push("Passwords do not match!");

  return errors;
};
export default validateInputs;
