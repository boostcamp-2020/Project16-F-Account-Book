import React from 'react';
import MainLayout from '@/views/layouts/MainLayout';
import AggregateCategory from '@/container/AggregateCategory';
import SelectMonth from '@/container/SelectMonth';

const AggregateCategoryPage = (): JSX.Element => {
  return (
    <MainLayout>
      <SelectMonth />
      <AggregateCategory />
    </MainLayout>
  );
};

export default AggregateCategoryPage;
