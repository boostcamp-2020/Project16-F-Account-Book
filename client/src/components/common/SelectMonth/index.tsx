import React, { useState } from 'react';

import Dropdown from '@components/common/Dropdown';
import ArrowIcon from '@/components/common/ArrowIcon';
import { SelectMonthType } from './type';
import * as S from './styles';

const MONTHSLIST = Array.from({ length: 12 }, (v, i) => String(i + 1));

export default function SelectMonth({ month }: SelectMonthType): JSX.Element {
  const [Month, setMonth] = useState(month);
  const dropDonwList = MONTHSLIST.map((v: string, i) => (
    <S.MonthList key={`selectMonth${i.toString()}`}>{v}</S.MonthList>
  ));

  return (
    <>
      <S.MonthDiv>
        {Month}월
        <S.DropdownPosition>
          <Dropdown icon={<ArrowIcon height="15px" width="20px" rotate="" />} isRight={false}>
            <S.Item>
              <S.ScollDiv>{dropDonwList}</S.ScollDiv>
            </S.Item>
          </Dropdown>
        </S.DropdownPosition>
      </S.MonthDiv>
    </>
  );
}
