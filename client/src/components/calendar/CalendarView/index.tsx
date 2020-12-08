import React from 'react';
import MatrixView from '@/components/calendar/MatrixView';
import TableCell from '@/components/calendar/TableCell';
import getDayMatrix from '@libs/calendarUtils';
import { getWeekDays } from '@libs/nationalCalendarUtils';
import { CalendarViewType } from './types';

function CalendarView({ totalInOut, lang, year, month }: CalendarViewType): JSX.Element {
  return (
    <>
      <MatrixView
        headers={getWeekDays(lang)}
        matrix={getDayMatrix(year, month)}
        cell={(date, key) => <TableCell day={date} key={`table${key}`} totalInOut={totalInOut} />}
      />
    </>
  );
}

export default CalendarView;
