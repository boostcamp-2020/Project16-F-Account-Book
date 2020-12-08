import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDay } from '@modules/datePicker/actions';
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
function TableCell({ day, totalInOut }: TableCellTypes): JSX.Element {
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
      <S.CellButton onClick={onClick} key={day}>
        {Number(dayPicker.day) === Number(day) && dayPicker.day !== 0 && <S.ClickCircle />}
        <div>{day}</div>
        <S.TotalIn>
          {totalInOut.get(day) && totalInOut.get(day).totalIn > 0 ? (
            <div>
              <AmountText
                isIncome
                amount={totalInOut.get(day).totalIn}
                size={getRem(totalInOut.get(day).totalIn)}
              />
            </div>
          ) : (
            ''
          )}
        </S.TotalIn>
        <S.TotalOut>
          {totalInOut.get(day) && totalInOut.get(day).totalOut > 0 ? (
            <div>
              <AmountText
                isIncome={false}
                amount={totalInOut.get(day).totalOut}
                size={getRem(totalInOut.get(day).totalOut)}
              />
            </div>
          ) : (
            ''
          )}
        </S.TotalOut>
      </S.CellButton>
    </>
  );
}

export default TableCell;
