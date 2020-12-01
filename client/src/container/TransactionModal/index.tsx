/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import CustomInput from '@components/common/forms/CustomInput';
import ModalHeaderText from '@components/transaction/ModalHeaderText';
import CommonButton from '@components/common/buttons/CustomButton';
import Modal from '@components/common/Modal';
import ModalXButton from '@components/transaction/ModalXButton';
import ModalRadioButton from '@components/transaction/ModalRadioButton';
import CustomSelectInput from '@components/common/forms/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { getPaymentThunk } from '@modules/payment/thunks';
import { getCategoryThunk } from '@modules/category';
import * as S from './styles';
import { TransactionModalProps } from './types';

const TransactionModal = ({ show, toggleModal }: TransactionModalProps): JSX.Element => {
  const { payment, category } = useSelector((state: RootState) => state);
  const categoryList = category.categories.data;
  const paymentList = payment.payments.data;
  const dispatch = useDispatch();

  const getCategoryList = useCallback(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);
  const getPaymentList = useCallback(() => {
    dispatch(getPaymentThunk());
  }, [dispatch]);

  useEffect(() => {
    getCategoryList();
    getPaymentList();
  }, [dispatch]);

  return (
    <>
      {paymentList && categoryList && (
        <Modal show={show} toggleModal={toggleModal}>
          <S.ModalHeader>
            <ModalHeaderText>가계부 등록</ModalHeaderText>
            <ModalXButton onClickEvent={toggleModal} />
          </S.ModalHeader>
          <S.ModalBody>
            <ModalRadioButton />
            <CustomInput placeholder="날짜선택" inputType="calendar" />
            <CustomSelectInput placeHolder="카테고리">{categoryList}</CustomSelectInput>
            <CustomSelectInput placeHolder="결제수단">{paymentList}</CustomSelectInput>
            <CustomInput placeholder="금액" inputType="amount" />
            <CustomInput placeholder="상세내용" inputType="description" />
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
