import React from 'react';
import MainLayout from '@/components/common/layouts/MainLayout';
import AggregateCategory from '@/container/AggregateCategory';

const AggregateCategoryPage = (): JSX.Element => {
  return (
    <MainLayout>
      <AggregateCategory />
    </MainLayout>
  );
};

export default AggregateCategoryPage;
