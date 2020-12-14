import React, { useCallback, useState } from 'react';
import MainLayout from '@/views/layouts/MainLayout';
import Calendar from '@container/Calendar';
import TransactionUpdateModal from '@/container/TransactionUpdateModal';
import TransactionModal from '@container/TransactionModal';
import ModalToggleButton from '@components/common/buttons/ModalToggleButton';

const CalendarPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);
  return (
    <MainLayout>
      <Calendar />
      <ModalToggleButton setToggle={toggleModal} />
      <TransactionModal show={showModal} toggleModal={toggleModal} />
      <TransactionUpdateModal />
    </MainLayout>
  );
};

export default CalendarPage;
