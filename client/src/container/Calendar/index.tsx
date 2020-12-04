import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import SelectMonth from '@/container/SelectMonth';
import TransactionListItem from '@/components/transaction/ListItem';
import AmountText from '@/components/transaction/AmountText';
import ViewCalendar from '@components/calendar/CalendarView';
import { mockTransactions, totalInOut } from '@/libs/mockData';
import { changeDate } from '@/modules/datePicker';
import * as S from './styles';

const Calendar = (): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

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
                <AmountText isIncome={false} amount={20000} />
              </div>
              <div>
                <AmountText isIncome amount={70000} />
              </div>
            </S.AmountAlign>
          </S.AmountDiv>
        </S.HeaderDiv>
        <S.CalendarDiv>
          <ViewCalendar
            totalInOut={totalInOut}
            lang="ko"
            year={datePicker.year}
            month={datePicker.month + 1}
          />
        </S.CalendarDiv>
        <S.TransactionDiv>
          {mockTransactions.map((mockTransaction, i) => (
            <TransactionListItem key={`mocLis${i.toString()}`} transaction={mockTransaction} />
          ))}
        </S.TransactionDiv>
      </S.CalendarPageDiv>
    </S.WarpCalendarDiv>
  );
};
export default Calendar;
