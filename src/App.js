import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Editor from "./pages/Editor";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMicrophone,
  faStop,
  faClock,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./images/logo.png";

library.add(faMicrophone, faStop, faClock, faLaptopCode);

export default function App() {
  return (
    <Router>
      <nav
        className="navbar is-black"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/">
            <a className="navbar-item">
              <img src={logo} width="112" height="28" />
            </a>
          </Link>
        </div>
      </nav>
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
