import React from 'react';
import MainLayout from '@/components/common/layouts/MainLayout';
import Calendar from '@container/Calendar';
import TransactionUpdateModal from '@/container/TransactionUpdateModal';

const CalendarPage = (): JSX.Element => {
  return (
    <MainLayout>
      <Calendar />
      <TransactionUpdateModal />
    </MainLayout>
  );
};

export default CalendarPage;
