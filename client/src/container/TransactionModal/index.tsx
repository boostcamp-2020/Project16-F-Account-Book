import React, { useCallback, useEffect, useReducer, useState } from 'react';
import CustomButton from '@/components/common/buttons/CustomButton';
import Modal from '@/components/common/Modal';
import ModalRadioButton from '@/components/transaction/ModalRadioButton';
import CustomSelectInput from '@/components/common/forms/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import { getPaymentThunk } from '@/modules/payment/thunks';
import { getCategoryThunk } from '@/modules/category';
import { postTransactionThunk } from '@/modules/transaction';
import { PostTransactionRequest } from '@/commons/types/transaction';
import CategoryDTO from '@/commons/dto/category';
import PaymentDTO from '@/commons/dto/payment';
import TransactionRequestDTO from '@/commons/dto/transaction-request';
import SMSParser from '@/libs/smsParser/parser';
import DateUtils from '@/libs/dateUtils';
import ModalInput from '@/components/transaction/ModalInput';
import ModalHeader from '@/components/transaction/ModalHeader';
import checkValidation from '@/libs/checkValidation';
import * as S from './styles';
import { TransactionModalProps } from './types';

const TransactionModal = ({ show, toggleModal }: TransactionModalProps): JSX.Element => {
  const [isIncome, setIsIncome] = useState(false);
  const [validation, setValidation] = useState(new Set(['isIncome']));
  const { payment, category } = useSelector((state: RootState) => state);
  const categoryList = category.data.map((c) => new CategoryDTO(c));
  const paymentList = payment.data.map((p) => new PaymentDTO(p));
  const dispatch = useDispatch();

  const getCategoryList = useCallback(() => {
    dispatch(getCategoryThunk());
  }, []);
  const getPaymentList = useCallback(() => {
    dispatch(getPaymentThunk());
  }, []);

  useEffect(() => {
    getCategoryList();
    getPaymentList();
  }, []);

  const onChangeReducer = (state: PostTransactionRequest, action: PostTransactionRequest) => {
    return action;
  };
  const [newTransaction, infoDispatch] = useReducer(onChangeReducer, {} as PostTransactionRequest);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkValidation(e.target.name, e.target.value)) {
      infoDispatch({ ...newTransaction, [e.target.name]: e.target.value });
      validation.add(e.target.name);
      setValidation(new Set([...validation]));
    } else {
      validation.delete(e.target.name);
      setValidation(new Set([...validation]));
    }
    if ((e.target.name === 'description' || e.target.name === 'amount') && e.target.value === '') {
      validation.delete(e.target.name);
      setValidation(new Set([...validation]));
    }
  };

  const postNewTransaction = useCallback(() => {
    const newTransactionDTO = new TransactionRequestDTO(newTransaction);
    dispatch(postTransactionThunk(newTransactionDTO));
    toggleModal();
  }, [dispatch, newTransaction]);

  const parseClipboardText = useCallback(() => {
    navigator.clipboard.readText().then((clipText) => {
      const parsedText = SMSParser.parse(clipText);
      if (parsedText.amount === 0) {
        infoDispatch({
          ...newTransaction,
          tradeAt: '',
          isIncome: 'false',
          amount: `${parsedText.amount}`,
          description: clipText,
        });
        setIsIncome(false);
      } else {
        const { year: thisYear } = DateUtils.parseDate(new Date());
        const formattedDate = DateUtils.formatString(new Date(`${thisYear}/${parsedText.date}`));
        infoDispatch({
          ...newTransaction,
          tradeAt: formattedDate,
          amount: `${parsedText.amount}`,
          description: clipText,
          isIncome: `${parsedText.isDeposit}`,
        });
        setIsIncome(parsedText.isDeposit);
      }
    });
  }, []);

  return (
    <>
      {paymentList && categoryList && (
        <Modal show={show} toggleModal={toggleModal}>
          <ModalHeader text="가계부 등록" toggleModal={toggleModal} />
          <S.ModalBody>
            <ModalRadioButton
              setIsIncome={setIsIncome}
              onChange={onChangeInput}
              value={newTransaction.isIncome === 'true'}
            />
            <ModalInput
              name="tradeAt"
              onChange={onChangeInput}
              placeholder="날짜선택"
              inputType="calendar"
              value={newTransaction.tradeAt}
            />
            <CustomSelectInput name="cid" onChange={onChangeInput} placeholder="카테고리">
              {categoryList.filter((categoryItem) => categoryItem.isIncome === isIncome)}
            </CustomSelectInput>
            <CustomSelectInput name="pid" onChange={onChangeInput} placeholder="결제수단">
              {paymentList}
            </CustomSelectInput>
            <ModalInput
              name="amount"
              onChange={onChangeInput}
              placeholder="금액"
              inputType="amount"
              value={newTransaction.amount}
            />
            <ModalInput
              name="description"
              onChange={onChangeInput}
              placeholder="상세내용"
              inputType="description"
              value={newTransaction.description}
            />
          </S.ModalBody>
          <S.ModalFooter>
            <CustomButton color="white" onClickEvent={parseClipboardText}>
              복사
            </CustomButton>
            <CustomButton
              isValid={validation.size > 5}
              color="blue"
              onClickEvent={postNewTransaction}
            >
              저장
            </CustomButton>
          </S.ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TransactionModal;
