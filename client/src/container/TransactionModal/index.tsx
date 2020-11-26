import React from 'react';
import ModalInputText from '@components/transaction/modalInput';
import ModalHeaderText from '@components/transaction/modalHeaderText';
import CommonButton from '@components/common/buttons/commonButton';
import Modal from '@components/transaction/modal';
import ModalXButton from '@components/transaction/modalXButton';
import * as S from './style';
import { TransactionModalProps } from './types';

const TransactionModal = ({ show, toggleModal }: TransactionModalProps): JSX.Element => {
  return (
    <Modal show={show} toggleModal={toggleModal}>
      <S.ModalHeader>
        <ModalHeaderText>가계부 등록</ModalHeaderText>
        <ModalXButton onClickEvent={toggleModal} />
      </S.ModalHeader>
      <S.ModalBody>
        <ModalInputText placeholder="날짜선택" inputType="calendar" />
        <ModalInputText placeholder="카테고리" inputType="amount" />
        <ModalInputText placeholder="결제수단" inputType="amount" />
        <ModalInputText placeholder="금액" inputType="amount" />
        <ModalInputText placeholder="상세내용" inputType="description" />
      </S.ModalBody>
      <S.ModalFooter>
        <CommonButton color="white">복사</CommonButton>
        <CommonButton color="blue">저장</CommonButton>
      </S.ModalFooter>
    </Modal>
  );
};

export default TransactionModal;
