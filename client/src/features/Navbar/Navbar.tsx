import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const userIsLoading = useAppSelector((state) => state.auth.loading);
  const authLinks = (
    <ul>
      <li>
        <Link to="/post">Post</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav>
      <h1>
        <Link to="/">fourseveneight</Link>
      </h1>
      {!userIsLoading && (
        <Fragment>{isLoggedIn ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
