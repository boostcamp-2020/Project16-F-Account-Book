import React, { useEffect, useCallback } from 'react';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate } from '@modules/datePicker/actions';
import { changeDay } from '@/modules/calendarDaySelector/action';
import * as S from './styles';

export default function SelectMonth(): JSX.Element {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onChangeLeftMonth = () => {
    if (datePicker.month > 1)
      dispatch(changeDate({ year: datePicker.year, month: datePicker.month - 1 }));
    else dispatch(changeDate({ year: datePicker.year - 1, month: 12 }));

    dispatch(changeDay({ day: 0 }));
  };
  const onChangeRightMonth = () => {
    if (datePicker.month < 12)
      dispatch(changeDate({ year: datePicker.year, month: datePicker.month + 1 }));
    else dispatch(changeDate({ year: datePicker.year + 1, month: 1 }));
    dispatch(changeDay({ day: 0 }));
  };

  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [dispatch, datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  return (
    <>
      <S.MonthDiv>
        <S.ClickArrow onClick={() => onChangeLeftMonth()}>{'<'}</S.ClickArrow>
        {`${datePicker.year}-${datePicker.month}`}
        <S.ClickArrow onClick={() => onChangeRightMonth()}>{'>'}</S.ClickArrow>
      </S.MonthDiv>
    </>
  );
}
