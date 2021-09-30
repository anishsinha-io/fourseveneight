import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Navbar from "../features/navbar/Navbar";
import Landing from "../features/landing/Landing";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../features/profile/Dashboard";
import PostForm from "../features/post/PostForm";
import Post from "../features/post/Post";
import UpdateForm from "../features/post/UpdateForm";
import Profile from "../features/profile/Profile";
import Alert from "../features/alert/Alert";

const Routes: React.FC = () => {
  return (
    <Fragment>
      <section className="container">
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/post/:slug" component={Post} />
          <Route exact path="/profiles/:username" component={Profile} />
          <PrivateRoute
            exact
            path="/update/:slug"
            redirectPath="/login"
            component={UpdateForm}
          />
          <PrivateRoute
            exact
            path="/create"
            redirectPath="/login"
            component={PostForm}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            redirectPath="/login"
            component={Dashboard}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
