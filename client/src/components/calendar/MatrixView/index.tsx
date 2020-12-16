import React from 'react';
import TableCell from '@/components/calendar/TableCell';
import getDayMatrix from '@/libs/calendarUtils';
import { getWeekDays } from '@/libs/nationalCalendarUtils';
import { MatrixViewTypes } from './types';
import * as S from './styles';

const MatrixView = React.memo(
  ({ totalInOut, year, month }: MatrixViewTypes): JSX.Element => {
    const headers: string[] = getWeekDays('ko');
    const matrix: string[][] = getDayMatrix(year, month);
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
                {row.map((v, j) => (
                  <TableCell
                    day={v}
                    key={`table${i * matrix[i].length + j}`}
                    totalInOut={totalInOut}
                  />
                ))}
              </S.DayTr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.Matrix>
    );
  },
);
export default MatrixView;
