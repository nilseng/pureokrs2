import React, { useState } from "react";
import { Switch, Route, Router } from "react-router-dom";

import "../styles/App.css";

import history from "../utils/history";

import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Home from "./Home";
import GetStarted from "./GetStarted";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import OKRList from "./OKRList";
import About from "./About";

function App() {
  const [okr, setOkr] = useState<any | null>();
  const [editObjective, setEditObjective] = useState(false);

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar setOkr={setOkr} setEditObjective={setEditObjective} />
        </header>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/getstarted" component={GetStarted} />
          <Route path="/about" component={About} />
          <PrivateRoute
            path="/okr-tree"
            component={Home}
            okr={okr}
            setOkr={setOkr}
            editObjective={editObjective}
            setEditObjective={setEditObjective}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            setOkr={setOkr}
            setEditObjective={setEditObjective}
          />
          <PrivateRoute path="/okr-list" component={OKRList} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
