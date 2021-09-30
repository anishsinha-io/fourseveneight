import React, { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Redirect } from "react-router-dom";
import { setAlert } from "../alert/alertSlice";
import { getTokenAndLogin } from "./authSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(getTokenAndLogin({ username, password }));
    setFormData({ username: "", password: "" });
  };

  if (user && user.username && token && isAuthenticated) {
    dispatch(setAlert("success", "Logging you in..."));
    return <Redirect to="/" />;
  }

  if (status === "failed")
    dispatch(setAlert("danger", "Incorrect username or password!"));
  return (
    <Fragment>
      <div className="form-wrapper">
        <div>
          <h1>Welcome Back</h1>
        </div>
        <div className="form-body">
          <form className="form-body__container" noValidate>
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
              <button
                type="button"
                className="btn btn-action"
                onClick={submitHandler}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
