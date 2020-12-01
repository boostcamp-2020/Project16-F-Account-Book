import React, { useState } from 'react';
import TransactionModal from '@container/TransactionModal';
import ModalToggleButton from '@components/common/buttons/modalToggleButton';

const DashBoardPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <ModalToggleButton setToggle={toggleModal} />
      <TransactionModal show={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default DashBoardPage;
