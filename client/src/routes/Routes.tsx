import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Navbar from "../features/navbar/Navbar";
import Landing from "../features/landing/Landing";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../features/dashboard/Dashboard";

const Routes: React.FC = () => {
  return (
    <Fragment>
      <section className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
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
