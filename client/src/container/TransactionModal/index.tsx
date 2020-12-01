/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ModalInputText from '@components/transaction/modalInput';
import ModalHeaderText from '@components/transaction/modalHeaderText';
import CommonButton from '@components/common/buttons/commonButton';
import Modal from '@components/transaction/modal';
import ModalXButton from '@components/transaction/modalXButton';
import ModalRadioButton from '@components/transaction/modalRadioButton';
import ModalSelectInput from '@components/transaction/ModalSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { getPaymentThunk } from '@modules/payment/thunks';
import * as S from './style';
import { TransactionModalProps } from './types';

const TransactionModal = ({ show, toggleModal }: TransactionModalProps): JSX.Element => {
  const optionList = [
    { id: 1000, name: 'gg' },
    { id: 25555, name: 'zz' },
  ];

  const { payments } = useSelector((state: RootState) => state.payment);
  const { loading } = payments;
  const paymentList = payments.data;
  const dispatch = useDispatch();

  const getPaymentList = () => {
    dispatch(getPaymentThunk());
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return (
    <>
      {loading && <h1>loading</h1>}
      {paymentList && (
        <Modal show={show} toggleModal={toggleModal}>
          <S.ModalHeader>
            <ModalHeaderText>가계부 등록</ModalHeaderText>
            <ModalXButton onClickEvent={toggleModal} />
          </S.ModalHeader>
          <S.ModalBody>
            <ModalRadioButton />
            <ModalInputText placeholder="날짜선택" inputType="calendar" />
            <ModalSelectInput placeHolder="카테고리">{optionList}</ModalSelectInput>
            <ModalSelectInput placeHolder="결제수단">{paymentList}</ModalSelectInput>
            <ModalInputText placeholder="금액" inputType="amount" />
            <ModalInputText placeholder="상세내용" inputType="description" />
          </S.ModalBody>
          <S.ModalFooter>
            <CommonButton color="white">복사</CommonButton>
            <CommonButton color="blue">저장</CommonButton>
          </S.ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TransactionModal;
