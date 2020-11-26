import React from 'react';
import { Reset } from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashBoardPage from './views/dashBoard';
import LoginPage from './views/login';

function App(): JSX.Element {
  return (
    <>
      <Reset />
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/dashboard" component={DashBoardPage} />
      </Switch>
    </>
  );
}

export default App;
