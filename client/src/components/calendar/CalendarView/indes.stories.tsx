import React from 'react';
import CalendarView from '.';

export default {
  title: 'components/calendar/CalendarView',
  component: CalendarView,
};

const totalInOut: any = {
  1: { totalIn: 150, totalOut: 5000 },
  5: { totalIn: 10000, totalOut: 0 },
  13: { totalIn: 10000, totalOut: 0 },
  18: { totalIn: 50000, totalOut: 40000 },
  20: { totalIn: 20000, totalOut: 25000 },
  21: { totalIn: 0, totalOut: 5000 },
  22: { totalIn: 10000, totalOut: 0 },
  23: { totalIn: 0, totalOut: 5000 },
  27: { totalIn: 10000, totalOut: 0 },
  30: { totalIn: 0, totalOut: 10000 },
};

export const ShowCalendar = (): JSX.Element => (
  <CalendarView totalInOut={totalInOut} lang="ko" year={2020} month={12} />
);
