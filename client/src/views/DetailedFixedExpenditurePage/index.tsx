import React from 'react';
import MainLayout from '@/components/common/layouts/MainLayout';
import DetailedFixedExpenditure from '@/container/DetailedFixedExpenditure';

const DetailedFixedExpenditurePage = (): JSX.Element => {
  return (
    <MainLayout>
      <DetailedFixedExpenditure />
    </MainLayout>
  );
};

export default DetailedFixedExpenditurePage;
