import React, { useEffect, useCallback } from 'react';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate } from '@modules/datePicker/actions';
import { changeDay } from '@/modules/calendarDaySelector/action';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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
  }, [datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  return (
    <>
      <S.MonthDiv>
        <S.ArrowDiv onClick={() => onChangeLeftMonth()}>
          <IoIosArrowBack />
        </S.ArrowDiv>
        <S.MonthText>{`${datePicker.year}-${datePicker.month}`}</S.MonthText>
        <S.ArrowDiv onClick={() => onChangeRightMonth()}>
          <IoIosArrowForward />
        </S.ArrowDiv>
      </S.MonthDiv>
    </>
  );
}
