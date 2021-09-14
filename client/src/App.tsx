import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dexie from "dexie";

import Routes from "./routes/Routes";

import { loadUserFromToken } from "./features/auth/authSlice";
import { getAndLoadPosts } from "./features/post/postSlice";
import { store } from "./app/store";

const dbName = "clientDB";
export const db = new Dexie(dbName);
db.version(1).stores({
  posts: "slug",
});

//todo add db.on('changes') and clear + reload indexeddb

const App: React.FC = () => {
  db.open().catch((err) => console.log(err));
  useEffect(() => {
    store.dispatch(loadUserFromToken());
    store.dispatch(getAndLoadPosts());
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
