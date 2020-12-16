import React from 'react';
import { AggregateCategoryDayPropType } from '@/commons/types/aggregate';
import * as S from './styles';

const AggregateCategoryDay = ({ day }: AggregateCategoryDayPropType): JSX.Element => {
  return <S.Day>{day.toString().slice(8, 10)}일</S.Day>;
};

export default AggregateCategoryDay;
