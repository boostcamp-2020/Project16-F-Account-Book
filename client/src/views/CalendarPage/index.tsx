import React from 'react';
import MainLayout from '@/components/common/layouts/MainLayout';
import Calendar from '@container/Calendar';

const CalendarPage = (): JSX.Element => {
  return (
    <MainLayout>
      <Calendar year={2020} month={12} />
    </MainLayout>
  );
};

export default CalendarPage;
