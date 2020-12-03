/* eslint-disable max-classes-per-file */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import CustomInput from '@components/common/forms/CustomInput';
import ModalHeaderText from '@components/transaction/ModalHeaderText';
import CustomButton from '@components/common/buttons/CustomButton';
import Modal from '@components/common/Modal';
import ModalXButton from '@components/transaction/ModalXButton';
import ModalRadioButton from '@components/transaction/ModalRadioButton';
import CustomSelectInput from '@components/common/forms/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { getPaymentThunk } from '@modules/payment/thunks';
import { getCategoryThunk } from '@modules/category';
import { postTransactionThunk } from '@/modules/transaction';
import { PostTransactionRequest } from '@/commons/types/transaction';
import { CategoryModel } from '@/commons/types/category';
import { PaymentModel } from '@/commons/types/payment';
import * as S from './styles';
import { TransactionModalProps } from './types';

class CategoryDTO {
  id: number;

  name: string;

  isIncome: boolean;

  uid: number;

  constructor(category: CategoryModel) {
    this.id = category.cid;
    this.name = category.name;
    this.isIncome = category.isIncome;
    this.uid = category.uid;
  }
}

class PaymentDTO {
  id: number;

  name: string;

  uid: number;

  constructor(payment: PaymentModel) {
    this.id = payment.pid;
    this.name = payment.name;
    this.uid = payment.uid;
  }
}

const TransactionModal = ({ show, toggleModal }: TransactionModalProps): JSX.Element => {
  const [isIncome, setIsIncome] = useState(false);

  const { payment, category } = useSelector((state: RootState) => state);
  const categoryList = (category.categories.data as CategoryModel[])?.map(
    (c) => new CategoryDTO(c as CategoryModel),
  );
  const paymentList = (payment.payments.data as PaymentModel[])?.map(
    (p) => new PaymentDTO(p as PaymentModel),
  );
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

  const onChangeReducer = (
    state: PostTransactionRequest,
    action: EventTarget & HTMLInputElement,
  ) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [newTransaction, infoDispatch] = useReducer(onChangeReducer, {} as PostTransactionRequest);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    infoDispatch(e.target);
  };

  const postNewTransaction = useCallback(() => {
    dispatch(postTransactionThunk(newTransaction));
  }, [dispatch, newTransaction]);

  return (
    <>
      {paymentList && categoryList && (
        <Modal show={show} toggleModal={toggleModal}>
          <S.ModalHeader>
            <ModalHeaderText>가계부 등록</ModalHeaderText>
            <ModalXButton onClickEvent={toggleModal} />
          </S.ModalHeader>
          <S.ModalBody>
            <ModalRadioButton setIsIncome={setIsIncome} onChange={onChangeInput} />
            <CustomInput
              name="tradeAt"
              onChange={onChangeInput}
              placeholder="날짜선택"
              inputType="calendar"
            />
            <CustomSelectInput name="cid" onChange={onChangeInput} placeholder="카테고리">
              {categoryList.filter((categoryItem) => categoryItem.isIncome === isIncome)}
            </CustomSelectInput>
            <CustomSelectInput name="pid" onChange={onChangeInput} placeholder="결제수단">
              {paymentList}
            </CustomSelectInput>
            <CustomInput
              name="amount"
              onChange={onChangeInput}
              placeholder="금액"
              inputType="amount"
            />
            <CustomInput
              name="description"
              onChange={onChangeInput}
              placeholder="상세내용"
              inputType="description"
            />
          </S.ModalBody>
          <S.ModalFooter>
            <CustomButton color="white">복사</CustomButton>
            <CustomButton color="blue" onClickEvent={postNewTransaction}>
              저장
            </CustomButton>
          </S.ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TransactionModal;
