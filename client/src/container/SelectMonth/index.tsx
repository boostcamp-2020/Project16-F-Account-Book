import React, { useEffect, useCallback } from 'react';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import Dropdown from '@/components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate } from '@modules/datePicker/actions';
import { changeDay } from '@/modules/calendarDaySelector/action';
import * as S from './styles';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => 12 - i);

export default function SelectMonth(): JSX.Element {
  const { datePicker, authorization } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [currentYear, currentMonth] = [new Date().getFullYear(), new Date().getMonth() + 1];
  const [createYear, createMonth] = authorization.createAt?.toString().split('-').slice(0, 2);

  const dataList = Array.from(
    { length: currentYear - Number(createYear) + 1 },
    (v, i) => currentYear - i,
  ).map((v) => {
    let Monthslenght = 0;
    if (Number(createYear) === currentYear) Monthslenght = currentMonth - Number(createMonth) + 1;
    if (v === currentYear && Number(createYear) !== currentYear) Monthslenght = currentMonth;
    if (v === Number(createYear) && v !== currentYear) Monthslenght = 13 - Number(createMonth);
    return [
      v,
      Array.from({ length: Monthslenght }, (value, i) => {
        if (v === Number(createYear) && v !== currentYear) return 12 - i;
        return currentMonth - i;
      }),
    ];
  });

  const onChangeDate = (e: any) => {
    const { value } = e.target;
    dispatch(changeDate({ year: datePicker.year, month: MONTHSLIST[value] }));
    dispatch(changeDay({ day: 0 }));
  };
  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [dispatch, datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  const dropdownButton = (
    <>
      {`${datePicker.month}월 `}
      <ArrowIcon height="15px" width="20px" rotate="" />
    </>
  );

  return (
    <>
      <S.MonthDiv>
        <S.DropdownPosition>
          <Dropdown icon={dropdownButton} isRight={false}>
            <S.ScollDiv>
              {dataList.map((date) =>
                [...date[1]].map((month, i) => (
                  <S.MonthList
                    key={`candidateDate${i.toString()}`}
                    onClick={onChangeDate}
                  >{`${date[0]}-${month}`}</S.MonthList>
                )),
              )}
            </S.ScollDiv>
          </Dropdown>
        </S.DropdownPosition>
      </S.MonthDiv>
    </>
  );
}
