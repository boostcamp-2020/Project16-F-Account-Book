import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
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
const TableCell = ({ day, totalInOut }: TableCellTypes): JSX.Element => {
  const { calendarDaySelector } = useSelector((state: RootState) => state);
  const { totalIn, totalOut } = totalInOut.get(day) ? totalInOut.get(day) : [false, false];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeDay({ day: 0 }));
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = Number(e.currentTarget.innerText.split('\n')[0]);
    if (!totalInOut.get(String(value))) {
      return;
    }
    if (value === calendarDaySelector.day) {
      dispatch(changeDay({ day: 0 }));
      return;
    }
    dispatch(changeDay({ day: value }));
  };
  return (
    <S.CellButton
      onClick={onClick}
      key={day}
      className={`${totalInOut.get(day) ? 'isCursor' : ''}  ${
        calendarDaySelector.day === Number(day) ? 'isBold' : ''
      }`}
    >
      {day}
      <S.TotalIn>
        {totalIn > 0 && <AmountText isIncome amount={totalIn} size={getRem(totalIn)} />}
      </S.TotalIn>
      <S.TotalOut>
        {totalOut > 0 && <AmountText isIncome={false} amount={totalOut} size={getRem(totalOut)} />}
      </S.TotalOut>
    </S.CellButton>
  );
};

export default TableCell;
