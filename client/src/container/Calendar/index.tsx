import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import SelectMonth from '@/container/SelectMonth';
import TransactionListContainer from '@/container/TransactionList';
import TransactionSelectList from '@/container/TransactionSelectList';
import AmountText from '@/components/transaction/AmountText';
import MatrixView from '@/components/calendar/MatrixView';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import { changeDay } from '@/modules/calendarDaySelector';
import * as S from './styles';

const Calendar = (): JSX.Element => {
  const { datePicker, transaction, calendarDaySelector } = useSelector((state: RootState) => state);
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
          <MatrixView year={datePicker.year} month={datePicker.month} />
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
export default React.memo(Calendar);
