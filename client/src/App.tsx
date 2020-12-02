import React from 'react';
import { Reset } from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import DashBoardPage from '@/views/DashBoardPage';
import LoginPage from '@/views/LoginPage';
import CalendarPage from '@/views/Calendar';
import Authorization from '@/container/Authorization';
import GlobalStyled from './GlobalStyled';

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
      <GlobalStyled />
      <Box>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Authorization />
          <Route path="/dashboard" component={DashBoardPage} />
          <Route path="/calendar" component={CalendarPage} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Box>
    </>
  );
}

export default App;
