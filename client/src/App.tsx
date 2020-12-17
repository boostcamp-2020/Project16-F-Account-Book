import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import GlobalStyled from './GlobalStyled';
import './App.css';
import LoadingSpinner from './components/common/LoadingSpinner';

const Login = lazy(() => import('@/views/LoginPage'));
const Calendar = lazy(() => import('@/views/CalendarPage'));
const FixedExpenditure = lazy(() => import('@/views/DetailedFixedExpenditurePage'));
const ManagePayment = lazy(() => import('@/views/PaymentManagePage'));
const ManageCategory = lazy(() => import('@/views/CategoryManagePage'));
const AggregateCategory = lazy(() => import('@/views/AggregateCategoryPage'));
const AggregatePeriod = lazy(() => import('@/views/AggregatePeriodPage'));
const Dashboard = lazy(() => import('@/views/DashBoardPage'));

function App(): JSX.Element {
  return (
    <>
      <GlobalStyled />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/detailed-fixed-expenditure" component={FixedExpenditure} />
          <Route path="/manage-payment" component={ManagePayment} />
          <Route path="/manage-category" component={ManageCategory} />
          <Route path="/aggregate-category" component={AggregateCategory} />
          <Route path="/aggregate-period" component={AggregatePeriod} />
          <Route path="/" component={Dashboard} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
