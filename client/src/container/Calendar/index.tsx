import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import SelectMonth from '@/container/SelectMonth';
import TransactionListContainer from '@/container/TransactionList';
import TransactionSelectList from '@/container/TransactionSelectList';
import AmountText from '@/components/transaction/AmountText';
import MatrixView from '@/components/calendar/MatrixView';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import { changeDay } from '@/modules/calendarDaySelector';
import getDayMatrix from '@/libs/calendarUtils';
import * as S from './styles';

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const Calendar = (): JSX.Element => {
  const { datePicker, transaction, calendarDaySelector } = useSelector((state: RootState) => state);
  const headers: string[] = WEEK_DAYS;
  const matrix: string[][] = getDayMatrix(datePicker.year, datePicker.month);
  const [dailyTotal, setDailyTotal] = useState<Map<number, { totalIn: number; totalOut: number }>>(
    new Map(transaction.aggregationByDate),
  );

  const dispatch = useDispatch();

  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
    return () => {
      dispatch(changeDay({ day: 0 }));
    };
  }, [datePicker]);

  useEffect(() => {
    if (!transaction.loading) {
      setDailyTotal(new Map(transaction.aggregationByDate));
    }
  }, [transaction]);

  return (
    <S.WarpCalendarDiv>
      <S.CalendarPageDiv>
        <S.HeaderDiv>
          <SelectMonth />
          <S.InOutDiv>
            소비: <AmountText isIncome={false} amount={transaction.totalOut} />
          </S.InOutDiv>
          <S.InOutDiv>
            수입: <AmountText isIncome amount={transaction.totalIn} />
          </S.InOutDiv>
        </S.HeaderDiv>
        <S.CalendarDiv>
          <MatrixView
            headers={headers}
            matrix={matrix}
            dailyTotal={dailyTotal}
            selectDay={calendarDaySelector.day}
          />
        </S.CalendarDiv>
        {calendarDaySelector.day === 0 ? (
          <TransactionListContainer editable />
        ) : (
          <TransactionSelectList />
        )}
      </S.CalendarPageDiv>
    </S.WarpCalendarDiv>
  );
};
export default Calendar;
