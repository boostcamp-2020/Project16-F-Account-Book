import MainLayout from '@/views/layouts/MainLayout';
import PaymentManageContainer from '@/container/PaymentManageMain';
import React from 'react';

const PaymentManagePage = (): JSX.Element => {
  return (
    <MainLayout>
      <PaymentManageContainer />
    </MainLayout>
  );
};

export default PaymentManagePage;
