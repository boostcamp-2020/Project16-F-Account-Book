import React from 'react';
import { useDispatch } from 'react-redux';
import { changeDay } from '@/modules/calendarDaySelector/action';
import AmountText from '@/components/transaction/AmountText';
import * as S from './styles';
import { TableCellTypes } from './types';

const getRem = (n: number): string => {
  let rem = '0.8rem';
  const len: number = String(n).length;
  if (len > 5 && len < 7) rem = '0.7rem';
  if (len > 6) rem = '0.1rem';
  return rem;
};

const TableCell = ({ day, selectDay, dailyTotal }: TableCellTypes): JSX.Element => {
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = Number(e.currentTarget.innerText.split('\n')[0]);
    if (!dailyTotal) {
      return;
    }
    if (value === selectDay) {
      dispatch(changeDay({ day: 0 }));
      return;
    }
    dispatch(changeDay({ day: value }));
  };
  return (
    <S.CellButton
      onClick={onClick}
      key={day}
      className={`${dailyTotal ? 'isCursor' : ''}  ${selectDay === Number(day) ? 'isBold' : ''}`}
    >
      {day}
      <S.TotalIn>
        {dailyTotal && dailyTotal.totalIn > 0 && (
          <AmountText isIncome amount={dailyTotal.totalIn} size={getRem(dailyTotal.totalIn)} />
        )}
      </S.TotalIn>
      <S.TotalOut>
        {dailyTotal && dailyTotal.totalOut > 0 && (
          <AmountText
            isIncome={false}
            amount={dailyTotal.totalOut}
            size={getRem(dailyTotal.totalOut)}
          />
        )}
      </S.TotalOut>
    </S.CellButton>
  );
};

export default React.memo(TableCell);
