import React from 'react';
import AmountText from '@/components/transaction/AmountText';
import { TableCellTypes } from './types';
import * as S from './style';

function TableCell({ day, totalInOut }: TableCellTypes): JSX.Element {
  return (
    <td>
      <div>{day}</div>
      <S.TotalIn>
        {totalInOut[day] && totalInOut[day].totalIn > 0 ? (
          <div>
            <AmountText isIncome amount={totalInOut[day].totalIn} />
          </div>
        ) : (
          ''
        )}
      </S.TotalIn>
      <S.TotalOut>
        {totalInOut[day] && totalInOut[day].totalOut > 0 ? (
          <div>
            <AmountText isIncome={false} amount={totalInOut[day].totalOut} />
          </div>
        ) : (
          ''
        )}
      </S.TotalOut>
    </td>
  );
}

export default TableCell;
