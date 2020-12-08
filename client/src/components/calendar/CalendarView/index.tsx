import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDay } from '@modules/datePicker/actions';
import MatrixView from '@/components/calendar/MatrixView';
import TableCell from '@/components/calendar/TableCell';
import getDayMatrix from '@libs/calendarUtils';
import { getWeekDays } from '@libs/nationalCalendarUtils';
import { CalendarViewType } from './types';

function CalendarView({ totalInOut, lang, year, month }: CalendarViewType): JSX.Element {
  const { dayPicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onClick = (e: any) => {
    const value = e.currentTarget.innerText.split('\n')[0];
    if (value === dayPicker.day) {
      dispatch(changeDay({ day: 0 }));
      return;
    }
    dispatch(changeDay({ day: value }));
  };
  return (
    <>
      <MatrixView
        headers={getWeekDays(lang)}
        matrix={getDayMatrix(year, month)}
        cell={(date, key) => (
          <TableCell onClick={onClick} day={date} key={`table${key}`} totalInOut={totalInOut} />
        )}
      />
    </>
  );
}

export default CalendarView;
