import React, { useState, useEffect } from 'react';
import TableCell from '@/components/calendar/TableCell';
import { useSelector } from 'react-redux';
import getDayMatrix from '@/libs/calendarUtils';
import { RootState } from '@/modules';
import { getWeekDays } from '@/libs/nationalCalendarUtils';
import { MatrixViewTypes } from './types';
import * as S from './styles';

const MatrixView = ({ year, month }: MatrixViewTypes): JSX.Element => {
  const headers: string[] = getWeekDays('ko');
  const matrix: string[][] = getDayMatrix(year, month);
  const { datePicker, calendarDaySelector, transaction } = useSelector((state: RootState) => state);
  const [dailyTotal, setDailyTotal] = useState<Map<number, { totalIn: number; totalOut: number }>>(
    new Map(transaction.aggregationByDate),
  );

  const getDailyTotal = (day: number) => {
    if (dailyTotal.has(day)) {
      return dailyTotal.get(day);
    }
    return undefined;
  };

  useEffect(() => {
    setDailyTotal(new Map(transaction.aggregationByDate));
  }, [transaction.aggregationByDate]);

  return (
    <S.Matrix>
      <S.Table>
        <S.Thead>
          <S.HeaderTr>
            {headers.map((v, i) => (
              <S.Th key={`day${i.toString()}`}>{v}</S.Th>
            ))}
          </S.HeaderTr>
        </S.Thead>
        <S.Tbody>
          {matrix.map((row, i: number) => (
            <S.DayTr key={`date${i.toString()}`}>
              {row.map((day, j) => (
                <TableCell
                  day={day}
                  key={`table${i * matrix[i].length + j}`}
                  dailyTotal={getDailyTotal(Number(day))}
                  selectDay={calendarDaySelector.day}
                />
              ))}
            </S.DayTr>
          ))}
        </S.Tbody>
      </S.Table>
    </S.Matrix>
  );
};
export default React.memo(MatrixView);
