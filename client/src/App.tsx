import React, { Fragment, useEffect } from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";

import Login from "./features/auth/Login";
import { loadUserFromToken } from "./features/auth/authSlice";
import { store } from "./app/store";

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUserFromToken());
  }, []);
  return (
    <Fragment>
      <Login />
    </Fragment>
  );
};

export default App;
