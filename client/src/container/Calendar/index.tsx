import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import SelectMonth from '@/container/SelectMonth';
import TransactionListContainer from '@/container/TransactionList';
import TransactionSelectList from '@/container/TransactionSelectList';
import AmountText from '@/components/transaction/AmountText';
import ViewCalendar from '@components/calendar/CalendarView';
import * as S from './styles';

const Calendar = (): JSX.Element => {
  const { datePicker, transaction, calendarDaySelector } = useSelector((state: RootState) => state);
  const dailyTotalInOut = new Map();
  transaction.aggregationByDate.map((dayData) =>
    dailyTotalInOut.set(String(dayData[0]), dayData[1]),
  );
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
          <ViewCalendar
            totalInOut={dailyTotalInOut}
            lang="ko"
            year={datePicker.year}
            month={datePicker.month}
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
