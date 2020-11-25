import React from 'react';
import { Reset } from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import DashBoardPage from './views/dashBoard';

const Box = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function App(): JSX.Element {
  return (
    <>
      <Reset />
      <Box>
        <Switch>
          <Route path="/dashboard" component={DashBoardPage} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Box>
    </>
  );
}

export default App;
