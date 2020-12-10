import React from 'react';
import { Reset } from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashBoardPage from '@/views/DashBoardPage';
import LoginPage from '@/views/LoginPage';
import CalendarPage from '@/views/CalendarPage';
import DetailedFixedExpenditurePage from '@/views/DetailedFixedExpenditurePage';
import PaymentManagePage from '@/views/PaymentManagePage';
import AggregateCategoryPage from '@/views/AggregateCategoryPage';
import GlobalStyled from './GlobalStyled';
import PaymentManagePage from './views/PaymentManagePage';
import CategoryManagePage from './views/CategoryManagePage';

function App(): JSX.Element {
  return (
    <>
      <Reset />
      <GlobalStyled />
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/dashboard" component={DashBoardPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/detailed-fixed-expenditure" component={DetailedFixedExpenditurePage} />
        <Route path="/manage-payment" component={PaymentManagePage} />
        <Route path="/aggregate-category" component={AggregateCategoryPage} />
        <Route path="/manage-category" component={CategoryManagePage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </>
  );
}

export default App;
