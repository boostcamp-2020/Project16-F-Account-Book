import MainLayout from '@/components/common/layouts/MainLayout';
import LineGraphContainer from '@/container/LineGraphContainer';
import React from 'react';

const AggregatePeriodPage = (): JSX.Element => {
  return (
    <MainLayout>
      <LineGraphContainer />
    </MainLayout>
  );
};

export default AggregatePeriodPage;
