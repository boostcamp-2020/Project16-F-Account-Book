import React, { useState } from 'react';

import Dropdown from '@components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import { changeDate } from '@modules/datePicker/actions';
import * as S from './styles';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => 12 - i);

export default function SelectMonth(): JSX.Element {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onChangeDate = (e: any) => {
    console.log(e.target);
    const { value } = e.target;
    dispatch(changeDate({ year: datePicker.year, month: MONTHSLIST[value] - 1 }));
  };

  return (
    <>
      <S.MonthDiv>
        {datePicker.month + 1 > 9 ? `${datePicker.month + 1}월` : `0${datePicker.month + 1}월`}
        <S.DropdownPosition>
          <Dropdown icon={<ArrowIcon height="15px" width="20px" rotate="" />} isRight={false}>
            <S.Item>
              <S.ScollDiv>
                {MONTHSLIST.map((candidateDate: number, i: number) => (
                  <S.MonthList
                    key={`candidateDate${i.toString()}`}
                    value={i}
                    onClick={onChangeDate}
                  >{`${datePicker.year}-${candidateDate}`}</S.MonthList>
                ))}
              </S.ScollDiv>
            </S.Item>
          </Dropdown>
        </S.DropdownPosition>
      </S.MonthDiv>
    </>
  );
}
