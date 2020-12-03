import React, { useState } from 'react';

import Dropdown from '@components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';
import { YearMonthModel } from '@/commons/types/date';
import DateUtils from '@libs/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate } from '@modules/datePicker/actions';
import * as S from './styles';
import { SelectMonthType } from './type';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => i + 1);

export default function SelectMonth(): JSX.Element {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onChangeDate = (e: any) => {
    const { value } = e.target;
    dispatch(changeDate({ year: datePicker.year, month: MONTHSLIST[value] - 1 }));
  };

  return (
    <>
      <S.MonthDiv>
        {datePicker.month}월
        <S.DropdownPosition>
          <Dropdown icon={<ArrowIcon height="15px" width="20px" rotate="" />} isRight={false}>
            <S.ScollDiv>
              {MONTHSLIST.map((candidateDate: number, i: number) => (
                <S.Item
                  key={`candidateDate${i.toString()}`}
                  value={i}
                  onClick={onChangeDate}
                >{`${datePicker.year}-${candidateDate}`}</S.Item>
              ))}
            </S.ScollDiv>
          </Dropdown>
        </S.DropdownPosition>
      </S.MonthDiv>
    </>
  );
}
