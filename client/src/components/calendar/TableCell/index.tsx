import React from 'react';
import AmountText from '@/components/transaction/AmountText';
import { TableCellTypes } from './types';
import * as S from './style';

const getRem = (n: number): string => {
  let rem = '0.8rem';
  const len: number = String(n).length;
  if (len > 5 && len < 7) rem = '0.7rem';
  if (len > 6) rem = '0.1rem';
  return rem;
};
function TableCell({ day, totalInOut }: TableCellTypes): JSX.Element {
  return (
    <td>
      <div>{day}</div>
      <S.TotalIn>
        {totalInOut[day] && totalInOut[day].totalIn > 0 ? (
          <div>
            <AmountText
              isIncome
              amount={totalInOut[day].totalIn}
              size={getRem(totalInOut[day].totalIn)}
            />
          </div>
        ) : (
          ''
        )}
      </S.TotalIn>
      <S.TotalOut>
        {totalInOut[day] && totalInOut[day].totalOut > 0 ? (
          <div>
            <AmountText
              isIncome={false}
              amount={totalInOut[day].totalOut}
              size={getRem(totalInOut[day].totalOut)}
            />
          </div>
        ) : (
          ''
        )}
      </S.TotalOut>
    </td>
  );
}

export default TableCell;
