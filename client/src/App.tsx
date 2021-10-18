import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Routes from "./routes/Routes";

import { loadUserFromToken } from "./components/auth/authSlice";
import { getAndLoadPosts } from "./components/post/postSlice";
import { loadQuestions } from "./components/question/questionSlice";
import { store } from "./app/store";

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUserFromToken());
    store.dispatch(getAndLoadPosts());
    store.dispatch(loadQuestions());
  }, []);

  return (
    <Router>
      <Fragment>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
