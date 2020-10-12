/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Login from './Login'
import List from './List'

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/list" component={List} />
         
        </Switch>
    </Router>
  );
};

export default Routes;