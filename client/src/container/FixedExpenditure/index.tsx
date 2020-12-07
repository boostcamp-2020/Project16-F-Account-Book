/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect } from 'react';
import { getFixedExpenditureThunk } from '@modules/fixedExpenditure';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import dateUtils from '@libs/dateUtils';
import { Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
import numberUtils from '@libs/numberUtils';
import * as S from './styles';

const FixedExpenditure = (): JSX.Element => {
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
        <S.HeaderBox>
          <S.HeaderTitle>
            <p>예정된 고정지출이</p>
            <p>{fixedExpenditure.fixedExpenditure.data?.length}개 있어요</p>
          </S.HeaderTitle>
          <Link to="/detailed-fixed-expenditure">자세히 보기</Link>
        </S.HeaderBox>
        <S.SumBox>
          <GoCalendar />
          <S.TextBox>
            <S.SumTitle>예정된 고정 지출</S.SumTitle>
            <S.Amount>{getSumFixedExpenditure()}원</S.Amount>
          </S.TextBox>
        </S.SumBox>
      </S.Box>
    </>
  );
};

export default FixedExpenditure;