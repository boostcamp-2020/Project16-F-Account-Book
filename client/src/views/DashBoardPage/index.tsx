import React, { useCallback, useState } from 'react';
import TransactionModal from '@container/TransactionModal';
import ModalToggleButton from '@components/common/buttons/ModalToggleButton';
import MainLayout from '@/components/common/layouts/MainLayout';
import DashboardContainer from '@/container/DashboardContainer';

const DashBoardPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);
  return (
    <MainLayout>
      <DashboardContainer />
      <ModalToggleButton setToggle={toggleModal} />
      {showModal && <TransactionModal show={showModal} toggleModal={toggleModal} />}
    </MainLayout>
  );
};

export default DashBoardPage;
