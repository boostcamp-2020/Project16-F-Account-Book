import React, { useCallback, useEffect } from 'react';
import { RootState } from '@/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregateCategoryThunk } from '@/modules/aggregateCategory';
import TabMenu from '@/components/common/TabMenu';
import AggregateCategoryMain from '@/components/aggregateCategory/Main';

const AggregateCategory = (): JSX.Element => {
  const { datePicker, aggregateCategory } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const getAggregateCategory = useCallback(() => {
    dispatch(getAggregateCategoryThunk(datePicker.year, datePicker.month));
  }, [datePicker]);

  useEffect(() => {
    getAggregateCategory();
  }, [datePicker]);

  const tabMenu = [
    {
      tabName: '지출',
      children: (
        <AggregateCategoryMain list={aggregateCategory.data.expenditure} isIncome={false} />
      ),
    },
    {
      tabName: '수입',
      children: <AggregateCategoryMain list={aggregateCategory.data.income} isIncome />,
    },
  ];
  return <TabMenu list={tabMenu} />;
};

export default AggregateCategory;
