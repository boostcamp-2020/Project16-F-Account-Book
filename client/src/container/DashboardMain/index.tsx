import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import TabMenu from '@/components/common/TabMenu';
import DashboardDetailsContainer from '@/container/DashboardDetails';

const DashboardContainer = (): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [dispatch]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  const tabMenu = [
    { tabName: '내역', children: <DashboardDetailsContainer /> },
    { tabName: '통계', children: <div /> },
  ];
  return <TabMenu list={tabMenu} />;
};

export default DashboardContainer;
