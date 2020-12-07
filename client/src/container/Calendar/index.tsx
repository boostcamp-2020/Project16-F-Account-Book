import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import SelectMonth from '@/container/SelectMonth';
import TransactionListContainer from '@/container/TransactionList';
import AmountText from '@/components/transaction/AmountText';
import ViewCalendar from '@components/calendar/CalendarView';
import * as S from './styles';

const Calendar = (): JSX.Element => {
  const { datePicker, transaction } = useSelector((state: RootState) => state);
  const dailyTotalInOut = new Map();
  transaction.aggregationByDate.map((dayData) =>
    dailyTotalInOut.set(String(dayData[0]), dayData[1]),
  );
  return (
    <S.WarpCalendarDiv>
      <S.CalendarPageDiv>
        <S.HeaderDiv>
          <SelectMonth />
          <S.AmountDiv>
            <S.InOutDiv>
              <div>소비: </div> <div>수입: </div>
            </S.InOutDiv>
            <S.AmountAlign>
              <div>
                <AmountText isIncome={false} amount={transaction.totalOut} />
              </div>
              <div>
                <AmountText isIncome amount={transaction.totalIn} />
              </div>
            </S.AmountAlign>
          </S.AmountDiv>
        </S.HeaderDiv>
        <S.CalendarDiv>
          <ViewCalendar
            totalInOut={dailyTotalInOut}
            lang="ko"
            year={datePicker.year}
            month={datePicker.month + 1}
          />
        </S.CalendarDiv>
        <TransactionListContainer />
      </S.CalendarPageDiv>
    </S.WarpCalendarDiv>
  );
};
export default Calendar;
