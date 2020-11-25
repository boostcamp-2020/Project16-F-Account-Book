import React from 'react';
import { Reset } from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashBoardPage from './views/dashBoard';

function App(): JSX.Element {
  return (
    <>
      <Reset />
      <Switch>
        <Route path="/dashboard" component={DashBoardPage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </>
  );
}

export default App;
