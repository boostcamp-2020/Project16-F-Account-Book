import React from 'react';

import Dropdown from '@components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate, changeDay } from '@modules/datePicker/actions';
import * as S from './styles';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => 12 - i);

export default function SelectMonth(): JSX.Element {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onChangeDate = (e: any) => {
    const { value } = e.target;
    dispatch(changeDate({ year: datePicker.year, month: MONTHSLIST[value] }));
    dispatch(changeDay({ day: 0 }));
  };

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
              {MONTHSLIST.map((candidateDate: number, i: number) => (
                <S.MonthList
                  key={`candidateDate${i.toString()}`}
                  value={i}
                  onClick={onChangeDate}
                >{`${datePicker.year}-${candidateDate}`}</S.MonthList>
              ))}
            </S.ScollDiv>
          </Dropdown>
        </S.DropdownPosition>
      </S.MonthDiv>
    </>
  );
}
