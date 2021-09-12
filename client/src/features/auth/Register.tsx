import React, { Fragment, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { registerUserAndLoginWithToken } from "../auth/authSlice";
import validateInputs from "../../util/validateInputs";

const Register = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const { firstName, lastName, email, username, password, passwordConfirm } =
    formData;
  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateInputs({
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm,
    });
    if (errors.length > 0) {
      //dispatch alerts
    }
    dispatch(
      registerUserAndLoginWithToken({
        firstName,
        lastName,
        email,
        username,
        password,
        passwordConfirm,
      })
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    });
  };
  return (
    <Fragment>
      <div className="form-wrapper">
        <div>
          <h1>Register</h1>
        </div>
        <div className="form-body">
          <form className="form-body__container" noValidate>
            <div className="form-group">
              <input
                type="text"
                placeholder="your first name"
                name="firstName"
                value={firstName}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="your last name"
                name="lastName"
                value={lastName}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="you@example.com"
                name="email"
                value={email}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="confirm password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={fieldChangeHandler}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-action"
                onClick={submitHandler}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
