/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect } from 'react';
import { getFixedExpenditureThunk } from '@modules/fixedExpenditure';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import dateUtils from '@libs/dateUtils';
import numberUtils from '@libs/numberUtils';
import FixedExpenditureItem from '@components/fixedExpenditure/Item';
import * as S from './styles';

const DetailedFixedExpenditure = (): JSX.Element => {
  const { datePicker, fixedExpenditure } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const getFixedExpenditure = useCallback(() => {
    const { startDate, endDate } = dateUtils.getStartEndDate(datePicker.year, datePicker.month);
    dispatch(getFixedExpenditureThunk(startDate, endDate));
  }, [dispatch, datePicker]);

  const getSumFixedExpenditure = useCallback(() => {
    const { data } = fixedExpenditure.fixedExpenditure;
    if (data) {
      let sum = 0;
      for (const value of data) {
        sum += value.amount;
      }
      return numberUtils.numberWithCommas(sum);
    }
    return 0;
  }, [fixedExpenditure]);

  useEffect(() => {
    getFixedExpenditure();
  }, [dispatch, datePicker]);
  return (
    <>
      <S.Box>
        <S.Title>고정적인 지출</S.Title>
        <S.Amount>총 {getSumFixedExpenditure()} 원</S.Amount>
      </S.Box>
      <S.Box>
        {fixedExpenditure.fixedExpenditure.data ? (
          fixedExpenditure.fixedExpenditure.data.map((fixedItem) => (
            <S.ItemBox key={fixedItem.fid}>
              <FixedExpenditureItem fixedItem={fixedItem} />
            </S.ItemBox>
          ))
        ) : (
          <div />
        )}
      </S.Box>
    </>
  );
};

export default DetailedFixedExpenditure;
