import React from 'react';
import MainLayout from '@/components/common/layouts/MainLayout';
import Calendar from '@container/Calendar';

const CalendarPage = (): JSX.Element => {
  return (
    <MainLayout>
      <Calendar />
    </MainLayout>
  );
};

export default CalendarPage;
