import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { logoutUser } from "../auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { Redirect } from "react-router";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const userIsLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    return <Redirect to="/"></Redirect>;
  };

  const authLinks = (
    <ul className="navbar-links">
      <li className="navbar-link">
        <Link to="/create">Post</Link>
      </li>
      <li className="navbar-link">
        <Link to="/" onClick={logoutHandler}>
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-links">
      <li className="navbar-link">
        <Link to="/register">Register</Link>
      </li>
      <li className="navbar-link">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">fourseveneight</Link>
      </h1>
      {!userIsLoading && (
        <Fragment>{isLoggedIn ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
