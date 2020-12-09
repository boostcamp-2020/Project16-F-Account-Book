import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import aggregateAPI from '@/libs/api/aggregate';

const DashboardStaticsContainer = (): JSX.Element => {
  const { transaction, datePicker } = useSelector((state: RootState) => state);
  const [overspendingIndexState, setOverspendingIndexState] = useState({
    overspendingIndex: 0,
    averageIncome: 0,
    expenditureThisMonth: 0,
  });
  const [mostSpendingCategoryState, setMostSpendingCategoryState] = useState({
    name: '',
    aggregate: '',
  });
  // useState
  useEffect(() => {
    Promise.all([
      aggregateAPI.getMostSpendingCategory(datePicker.year, datePicker.month),
      aggregateAPI.getOverspendingIndex(datePicker.year, datePicker.month),
    ]).then(([mostSpendingCategory, overspendingIndex]) => {
      setMostSpendingCategoryState(mostSpendingCategory);
      setOverspendingIndexState(overspendingIndex);
    });
  }, [datePicker]);

  const getSpendingStatus = useCallback((): string => {
    // 과소비 지수 = (월평균 수입 - 월 평균 저축) / 월 평균 수입
    // 1 이상 : 재정적으로 매우 위험한 상태
    // 0.7~1 미만 : 과소비 상태
    // 0.5~0.7 미만 : 수입과 지출의 비중이 적정한 상태
    // 0.5 미만 : 근검절약을 실천하는 훌륭한 상태

    const { overspendingIndex } = overspendingIndexState;
    if (overspendingIndex >= 1) {
      return '매우 위험한 상태입니다';
    }
    if (overspendingIndex >= 0.7) {
      return '좋지 않네요 😢';
    }
    if (overspendingIndex >= 0.5) {
      return '나쁘지 않아요 🙂';
    }
    return '훌륭하네요 😍';
  }, []);

  return (
    <>
      <p>이번달 소비 습관이 {getSpendingStatus()}</p>
      <p>{mostSpendingCategoryState.name}에 가장 많은 돈을 쓰셨어요</p>
      <p>사용한 금액 : {mostSpendingCategoryState.aggregate}</p>
      <p>{transaction.mostOutDateDetail.date}일에 가장 많은 돈을 쓰셨어요</p>
      <p>사용한 금액 : {transaction.mostOutDateDetail.amount}</p>
    </>
  );
};

export default DashboardStaticsContainer;
