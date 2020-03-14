import React from "react";
import { Switch, Route } from "react-router-dom";

import "../styles/App.css";
import Welcome from "./Welcome";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
