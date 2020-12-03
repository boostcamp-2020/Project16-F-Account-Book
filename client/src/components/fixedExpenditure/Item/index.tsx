import React from 'react';
import numberUtils from '@libs/numberUtils';
import { FixedExpenditureItemPropType } from './types';
import * as S from './styles';

const FixedExpenditureItem = ({ fixedItem }: FixedExpenditureItemPropType): JSX.Element => {
  return (
    <S.Box>
      <S.TitleBox>
        <S.Description>{fixedItem.description}</S.Description>
        <S.Amount>약 {numberUtils.numberWithCommas(fixedItem.amount)} 원</S.Amount>
      </S.TitleBox>
      <S.Date>{fixedItem.tradeAt.toString().substring(8)}일</S.Date>
    </S.Box>
  );
};

export default FixedExpenditureItem;
