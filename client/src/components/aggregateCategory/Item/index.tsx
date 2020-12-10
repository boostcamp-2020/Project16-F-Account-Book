/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useCallback } from 'react';
import { AggregateCategoryItemPropType } from '@/commons/types/aggregateCategory';
import NumberUtils from '@/libs/numberUtils';
import { FcCollapse, FcExpand } from 'react-icons/fc';
import AggregateCategoryDay from '@/components/aggregateCategory/Day';
import * as S from './styles';

const AggregateCategoryItem = ({ item, total }: AggregateCategoryItemPropType): JSX.Element => {
  const [isClick, setIsClick] = useState(false);
  const [display, setDisplay] = useState('none');

  const daySet = new Set<string>();

  const checkSet = useCallback(
    (key: string) => {
      if (daySet.has(key)) {
        return false;
      }
      daySet.add(key);
      return true;
    },
    [daySet],
  );
  const onClick = () => {
    setIsClick(!isClick);
    display === 'none' ? setDisplay('block') : setDisplay('none');
  };

  return (
    <S.Box>
      <S.InfoBox>
        <S.LeftBox>
          <S.CategoryName>{item.category}</S.CategoryName>
          <S.BottomBox>
            <S.Percent>{Math.round((Number(item.aggregate) / total) * 100)}% |&nbsp;</S.Percent>
            <S.Agregate>{NumberUtils.numberWithCommas(Number(item.aggregate))}원</S.Agregate>
          </S.BottomBox>
        </S.LeftBox>
        {isClick ? <FcCollapse onClick={onClick} /> : <FcExpand onClick={onClick} />}
      </S.InfoBox>
      <S.DetailBox style={{ display }}>
        {item.dataArray.map((value) => (
          <S.DetailItemBox key={item.category + value.tid}>
            {checkSet(`${item.category}${value.tradeAt}`) ? (
              <AggregateCategoryDay day={new Date(value.tradeAt)} />
            ) : (
              <></>
            )}
            <S.DetailItem>
              <S.DetailInfo>{value.description}</S.DetailInfo>
              <S.DetailBottomBox>
                <S.DetailInfo>{value.payment}</S.DetailInfo>
                <S.Agregate>{NumberUtils.numberWithCommas(Number(value.amount))}원</S.Agregate>
              </S.DetailBottomBox>
            </S.DetailItem>
          </S.DetailItemBox>
        ))}
      </S.DetailBox>
    </S.Box>
  );
};

export default AggregateCategoryItem;
