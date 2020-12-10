import React from 'react';
import TabMenu from '@/components/common/TabMenu';
import CategoryManageContainer from '../CategoryManageContainer';

const CategoryManageMain = (): JSX.Element => {
  const tabMenu = [
    { tabName: '지출', children: <CategoryManageContainer isIncome={false} /> },
    { tabName: '수입', children: <CategoryManageContainer isIncome /> },
  ];
  return <TabMenu list={tabMenu} />;
};

export default CategoryManageMain;
