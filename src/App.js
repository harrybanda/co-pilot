import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Editor from "./pages/Editor";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

library.add(faMicrophone, faStop);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
