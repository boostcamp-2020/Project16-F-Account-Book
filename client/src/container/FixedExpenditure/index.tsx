import React, { useCallback, useEffect } from 'react';
import { getFixedExpenditureThunk } from '@modules/fixedExpenditure';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import dateUtils from '@libs/dateUtils';

const FixedExpenditure = (): JSX.Element => {
  const { datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const getFixedExpenditure = useCallback(() => {
    const { startDate, endDate } = dateUtils.getStartEndDate(datePicker.year, datePicker.month);
    dispatch(getFixedExpenditureThunk(startDate, endDate));
  }, [dispatch, datePicker]);

  useEffect(() => {
    getFixedExpenditure();
  }, [dispatch, datePicker]);
  return <></>;
};

export default FixedExpenditure;
