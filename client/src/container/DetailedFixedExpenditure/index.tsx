/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect } from 'react';
import { getFixedExpenditureThunk } from '@modules/fixedExpenditure';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import numberUtils from '@libs/numberUtils';
import FixedExpenditureItem from '@components/fixedExpenditure/Item';
import * as S from './styles';

const DetailedFixedExpenditure = (): JSX.Element => {
  const { datePicker, fixedExpenditure } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const getFixedExpenditure = useCallback(() => {
    dispatch(getFixedExpenditureThunk(datePicker.year, datePicker.month));
  }, [dispatch, datePicker]);

  const getAmount = useCallback(
    (type: string) => {
      const { data } = fixedExpenditure;
      let sum = 0;
      if (data) {
        if (type === 'estimated') {
          data.estimated.forEach((temp) => {
            sum += temp.amount;
          });
        } else if (type === 'paid') {
          data.paid.forEach((temp) => {
            sum += temp.amount;
          });
        } else {
          data.estimated.forEach((temp) => {
            sum += temp.amount;
          });
          data.paid.forEach((temp) => {
            sum += temp.amount;
          });
        }

        return numberUtils.numberWithCommas(sum);
      }
      return sum;
    },
    [fixedExpenditure],
  );

  useEffect(() => {
    getFixedExpenditure();
  }, [dispatch, datePicker]);
  return (
    <>
      <S.Box>
        <S.Title>고정적인 지출</S.Title>
        <S.Amount>총 {getAmount('both')} 원</S.Amount>
      </S.Box>
      {fixedExpenditure.data?.paid.length !== 0 ? (
        <>
          <S.Box>
            <S.Category color="#E73636">지출 완료</S.Category>
            {fixedExpenditure.data?.paid.map((fixedItem) => (
              <S.ItemBox key={`fixed${fixedItem.fid}`}>
                <FixedExpenditureItem fixedItem={fixedItem} isPaid />
              </S.ItemBox>
            ))}
            <S.AmountBox>
              <p>지출 완료 합계</p>
              <p>{getAmount('paid')}원</p>
            </S.AmountBox>
          </S.Box>
          <S.Box>
            <S.Category color="#0e7ee0">지출 예정</S.Category>
            {fixedExpenditure.data?.estimated.map((fixedItem) => (
              <S.ItemBox key={`fixed${fixedItem.fid}`}>
                <FixedExpenditureItem fixedItem={fixedItem} isPaid={false} />
              </S.ItemBox>
            ))}
            <S.AmountBox>
              <p>지출 예정 합계</p>
              <p>{getAmount('estimated')}원</p>
            </S.AmountBox>
          </S.Box>
        </>
      ) : (
        <div />
      )}
    </>
  );
};

export default DetailedFixedExpenditure;
