import React from 'react';
import TabMenu from '@/components/common/TabMenu';
import CategoryManageContainer from '../CategoryManageContainer';

const CategoryManageMain = (): JSX.Element => {
  const tabMenu = [
    { tabName: '지출', children: <CategoryManageContainer isIncome={false} key="c_expenditure" /> },
    { tabName: '수입', children: <CategoryManageContainer isIncome key="c_income" /> },
  ];
  return <TabMenu list={tabMenu} />;
};

export default CategoryManageMain;
