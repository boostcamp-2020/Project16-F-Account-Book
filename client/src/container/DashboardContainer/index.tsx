import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import { Link } from 'react-router-dom';
import SelectMonth from '@/container/SelectMonth';
import TransactionListItem from '@/components/transaction/ListItem';
import AmountText from '@/components/transaction/AmountText';
import FixedExpenditure from '@container/FixedExpenditure';
import aggregateAPI from '@/libs/api/aggregate';
import NumberUtils from '@/libs/numberUtils';
import EmptyStateComponent from '@/components/transaction/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import * as S from './styles';

const RECENT_TRANSACTION_LIMIT = 3;

const DashboardContainer = (): JSX.Element => {
  const { transaction: transactionState, datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [datePicker]);
  const [overspendingIndexState, setOverspendingIndexState] = useState({
    overspendingIndex: 0,
    averageIncome: 0,
    expenditureThisMonth: 0,
  });
  const [mostSpendingCategoryState, setMostSpendingCategoryState] = useState({
    name: '',
    aggregate: '',
  });

  const updateAggregateStatus = useCallback(() => {
    Promise.all([
      aggregateAPI.getMostSpendingCategory(datePicker.year, datePicker.month),
      aggregateAPI.getOverspendingIndex(datePicker.year, datePicker.month),
    ]).then(([mostSpendingCategory, overspendingIndex]) => {
      setMostSpendingCategoryState(mostSpendingCategory);
      setOverspendingIndexState(overspendingIndex);
    });
  }, [datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  useEffect(() => {
    updateAggregateStatus();
  }, [transactionState]);

  const getSpendingStatus = useCallback(
    (overspendingIndex: number): string => {
      // 1 이상 : 재정적으로 매우 위험한 상태
      // 0.7~1 미만 : 과소비 상태
      // 0.5~0.7 미만 : 수입과 지출의 비중이 적정한 상태
      // 0.5 미만 : 근검절약을 실천하는 훌륭한 상태

      if (overspendingIndex === 0) {
        return '을 측정할 수 없습니다';
      }
      if (overspendingIndex >= 1) {
        return '은 위험한 상태입니다❗️';
      }
      if (overspendingIndex >= 0.7) {
        return '이 좋지 않네요 😢';
      }
      if (overspendingIndex >= 0.5) {
        return '이 좋습니다 🙂';
      }
      return '이 훌륭하네요 😍';
    },
    [overspendingIndexState],
  );

  return (
    <>
      <S.SelectorBox>
        <SelectMonth />
      </S.SelectorBox>
      {transactionState.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <S.Box>
            <S.BoxHeader>
              <S.BoxTitle>{datePicker.month}월 소비/수입</S.BoxTitle>
              <S.SpendingStatusDescription>
                소비 습관{getSpendingStatus(overspendingIndexState.overspendingIndex)}
              </S.SpendingStatusDescription>
            </S.BoxHeader>
            <S.BoxRow>
              <AmountText isIncome={false} size="lg" amount={transactionState.totalOut} />
            </S.BoxRow>
            <S.BoxRow>
              <AmountText isIncome size="lg" amount={transactionState.totalIn} />
            </S.BoxRow>
          </S.Box>
          <S.Box>
            <S.BoxHeader>
              <S.BoxTitle>최근 내역</S.BoxTitle>
              <Link to="/calendar">자세히 보기</Link>
            </S.BoxHeader>
            {transactionState.transactions.length !== 0 ? (
              transactionState.transactions
                .slice(0, RECENT_TRANSACTION_LIMIT)
                .map((transaction) => (
                  <S.RecentTransactionBoxItem key={`transaction${transaction.tid}`}>
                    <TransactionListItem transaction={transaction} />
                  </S.RecentTransactionBoxItem>
                ))
            ) : (
              <EmptyStateComponent align="left" />
            )}
          </S.Box>
          <FixedExpenditure />
          <S.Box>
            <S.BoxHeader>
              <S.BoxTitle>카테고리 통계</S.BoxTitle>
              <Link to="/aggregate-category">자세히 보기</Link>
            </S.BoxHeader>
            <S.BoxRow>{mostSpendingCategoryState.name}에 가장 많은 돈을 쓰셨어요</S.BoxRow>
            <S.BoxRow>
              사용한 금액 :{' '}
              {NumberUtils.numberWithCommas(Number(mostSpendingCategoryState.aggregate || 0))}원
            </S.BoxRow>
          </S.Box>

          <S.Box>
            <S.BoxHeader>
              <S.BoxTitle>기간별 통계</S.BoxTitle>
              <Link to="/aggregate-period">자세히 보기</Link>
            </S.BoxHeader>
            <S.BoxRow>
              {transactionState.mostOutDateDetail.date}일에 가장 많은 돈을 쓰셨어요
            </S.BoxRow>
            <S.BoxRow>
              사용한 금액 :{' '}
              {NumberUtils.numberWithCommas(transactionState.mostOutDateDetail.amount)}원
            </S.BoxRow>
          </S.Box>
        </>
      )}
    </>
  );
};

export default DashboardContainer;
