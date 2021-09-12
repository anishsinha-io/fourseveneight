import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const Routes = () => {
  return (
    <Fragment>
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
