/* eslint-disable no-restricted-syntax */
import React, { useCallback, useEffect } from 'react';
import { getFixedExpenditureThunk } from '@modules/fixedExpenditure';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import { Link } from 'react-router-dom';
import { GoCalendar } from 'react-icons/go';
import numberUtils from '@libs/numberUtils';
import * as S from './styles';

const FixedExpenditure = (): JSX.Element => {
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
        } else {
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
        <S.HeaderBox>
          <S.HeaderTitle>
            <p>예정된 고정지출이</p>
            <p>{fixedExpenditure.data.estimated.length}개 있어요</p>
          </S.HeaderTitle>
          <Link to="/detailed-fixed-expenditure">자세히 보기</Link>
        </S.HeaderBox>
        <S.SumBox>
          <GoCalendar color="red" />
          <S.TextBox>
            <S.SumTitle>완료된 고정 지출</S.SumTitle>
            <S.Amount>{getAmount('paid')}원</S.Amount>
          </S.TextBox>
        </S.SumBox>
        <S.SumBox>
          <GoCalendar color="#0e7ee0" />
          <S.TextBox>
            <S.SumTitle>예정된 고정 지출</S.SumTitle>
            <S.Amount>{getAmount('estimated')}원</S.Amount>
          </S.TextBox>
        </S.SumBox>
      </S.Box>
    </>
  );
};

export default FixedExpenditure;
