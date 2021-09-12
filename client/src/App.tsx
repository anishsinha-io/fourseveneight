import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./features/landing/Landing";
import Routes from "./routes/Routes";

import { loadUserFromToken } from "./features/auth/authSlice";
import { store } from "./app/store";

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUserFromToken());
  }, []);
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
