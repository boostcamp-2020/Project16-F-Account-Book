import React from 'react';
import MainLayout from '@/views/layouts/MainLayout';
import DetailedFixedExpenditure from '@/container/DetailedFixedExpenditure';

const DetailedFixedExpenditurePage = (): JSX.Element => {
  return (
    <MainLayout>
      <DetailedFixedExpenditure />
    </MainLayout>
  );
};

export default DetailedFixedExpenditurePage;
