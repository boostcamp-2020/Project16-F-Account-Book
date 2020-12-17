import React from 'react';
import TableCell from '@/components/calendar/TableCell';
import { MatrixViewTypes } from './types';
import * as S from './styles';

const MatrixView = ({ headers, matrix, selectDay, dailyTotal }: MatrixViewTypes): JSX.Element => {
  const getDailyTotal = (day: number) => {
    if (dailyTotal.has(day)) {
      return dailyTotal.get(day);
    }
    return undefined;
  };
  return (
    <S.Matrix>
      <S.Table>
        <S.Thead>
          <S.HeaderTr>
            {headers.map((dayName, i) => (
              <S.Th key={`day${i.toString()}`}>{dayName}</S.Th>
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
                  selectDay={selectDay}
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
