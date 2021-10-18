import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

//auth
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

//misc
import Navbar from "../components/navbar/Navbar";
import Landing from "../components/landing/Landing";

//util
import PrivateRoute from "./PrivateRoute";

//post
import PostForm from "../components/post/PostForm";
import Post from "../components/post/Post";
import UpdatePostForm from "../components/post/UpdatePostForm";

//profile
import Profile from "../components/profile/Profile";
import InitialPreferences from "../components/newuser/InitialPreferences";

//question
import QuestionForm from "../components/question/QuestionForm";
import Question from "../components/question/Question";
import UpdateQuestionForm from "../components/question/UpdateQuestionForm";

//editor
import RichTextEditor from "../components/editor/RichTextEditor";

const Routes: React.FC = () => {
  return (
    <Fragment>
      <section className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/post/:slug" component={Post} />
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path="/question/:questionId" component={Question} />
          <PrivateRoute
            exact
            path="/test"
            redirectPath="/login"
            component={RichTextEditor}
          />
          <PrivateRoute
            exact
            path="/update/:slug"
            redirectPath="/login"
            component={UpdatePostForm}
          />

          <PrivateRoute
            exact
            path="/newuser/setup"
            redirectPath="/"
            component={InitialPreferences}
          />
          <PrivateRoute
            exact
            path="/create/question"
            redirectPath="/"
            component={QuestionForm}
          />
          <PrivateRoute
            exact
            path="/question/update/:questionId"
            redirectPath="/login"
            component={UpdateQuestionForm}
          />
          <PrivateRoute
            exact
            path="/create/post"
            redirectPath="/login"
            component={PostForm}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
