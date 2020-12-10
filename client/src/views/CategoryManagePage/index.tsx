import MainLayout from '@/components/common/layouts/MainLayout';
import CategoryManageMain from '@/container/CategoryManageMain';
import React from 'react';

const CategoryManagePage = (): JSX.Element => {
  return (
    <MainLayout>
      <CategoryManageMain />
    </MainLayout>
  );
};

export default CategoryManagePage;
