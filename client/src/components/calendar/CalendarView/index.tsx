import React from 'react';
import MatrixView from '@/components/calendar/MatrixView';
import TableCell from '@/components/calendar/TableCell';
import getDayMatrix from '@libs/calendarUtils';
import { getWeekDays } from '@libs/nationalCalendarUtils';
import { ViewCalendarType } from './types';

function ViewCalendar({ totalInOut, lang, year, month }: ViewCalendarType): JSX.Element {
  return (
    <>
      <MatrixView
        headers={getWeekDays(lang)}
        matrix={getDayMatrix(year, month)}
        cell={(date, key) => <TableCell day={date} key={key} totalInOut={totalInOut} />}
      />
    </>
  );
}

export default ViewCalendar;
