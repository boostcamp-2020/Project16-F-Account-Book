import Modal from '@/components/common/Modal';
import ModalHeader from '@/components/transaction/ModalHeader';
import { RootState } from '@/modules';
import { toggleModalOff } from '@/modules/updateModal';
import React, { useCallback, useState, useReducer, useEffect } from 'react';
import CategoryDTO from '@/commons/dto/category';
import PaymentDTO from '@/commons/dto/payment';
import { useDispatch, useSelector } from 'react-redux';
import ModalRadioButton from '@/components/transaction/ModalRadioButton';
import { UpdateTransactionRequest } from '@/commons/types/transaction';
import ModalInput from '@/components/transaction/ModalInput';
import CustomSelectInput from '@/components/common/forms/CustomSelectInput';
import CustomButton from '@/components/common/buttons/CustomButton';
import checkValidation from '@/libs/checkValidation';
import TransactionRequestDTO from '@/commons/dto/transaction-request';
import { deleteTransactionThunk, updateTransactionThunk } from '@/modules/transaction';
import * as S from './styles';

const MODALLSITARR = ['tradeAt', 'description', 'amount', 'pid', 'cid', 'isIncome'];

const TransactionUpdateModal = (): JSX.Element => {
  const [isIncome, setIsIncome] = useState(false);
  const [validation, setValidation] = useState(new Set(MODALLSITARR));
  const { payment, category } = useSelector((state: RootState) => state);
  const { toggle, data } = useSelector((state: RootState) => state.updateModal);
  const categoryList = category.data.map((c) => new CategoryDTO(c));
  const paymentList = payment.data.map((p) => new PaymentDTO(p));
  const dispatch = useDispatch();
  const toggleModal = useCallback(() => {
    dispatch(toggleModalOff());
    setValidation(new Set(MODALLSITARR));
  }, [dispatch]);

  const onChangeReducer = (state: UpdateTransactionRequest, action: UpdateTransactionRequest) => {
    return action;
  };

  const [updatedTransaction, infoDispatch] = useReducer(onChangeReducer, {
    tid: data?.tid,
  } as UpdateTransactionRequest);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkValidation(e.target.name, e.target.value)) {
      infoDispatch({ ...updatedTransaction, [e.target.name]: e.target.value });
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

  useEffect(() => {
    if (!data) return;
    infoDispatch({
      tid: data.tid,
      tradeAt: data.tradeAt,
      amount: data.amount.toString(),
      description: data.description,
      isIncome: data.isIncome.toString(),
      cid: data.cid,
      pid: data.pid,
    });
    setIsIncome(data.isIncome);
  }, [data]);

  const updateTransaction = useCallback(() => {
    const newTransactionDTO = new TransactionRequestDTO(updatedTransaction);
    dispatch(updateTransactionThunk(newTransactionDTO));
    dispatch(toggleModalOff());
  }, [dispatch, updatedTransaction, data]);

  const deleteTransaction = useCallback(() => {
    if (window.confirm('삭제 하시겠습니까?')) {
      if (!data) return;
      dispatch(deleteTransactionThunk(data.tid));
      dispatch(toggleModalOff());
    } else {
      toggleModalOff();
    }
  }, [dispatch, data]);

  return (
    <>
      {data && (
        <Modal show={toggle} toggleModal={toggleModal}>
          <ModalHeader text="거래내역 수정" toggleModal={toggleModal} />
          <S.ModalBody>
            <ModalRadioButton
              setIsIncome={setIsIncome}
              onChange={onChangeInput}
              value={updatedTransaction.isIncome === 'true'}
            />
            <ModalInput
              name="tradeAt"
              onChange={onChangeInput}
              placeholder="날짜선택"
              inputType="calendar"
              value={updatedTransaction.tradeAt}
            />
            <CustomSelectInput
              name="cid"
              onChange={onChangeInput}
              placeholder="카테고리"
              value={new CategoryDTO(data.category)}
            >
              {categoryList.filter((categoryItem) => categoryItem.isIncome === isIncome)}
            </CustomSelectInput>
            <CustomSelectInput
              name="pid"
              onChange={onChangeInput}
              placeholder="결제수단"
              value={new PaymentDTO(data.payment)}
            >
              {paymentList}
            </CustomSelectInput>
            <ModalInput
              name="amount"
              onChange={onChangeInput}
              placeholder="금액"
              inputType="amount"
              value={updatedTransaction.amount}
            />
            <ModalInput
              name="description"
              onChange={onChangeInput}
              placeholder="상세내용"
              inputType="description"
              value={updatedTransaction.description}
            />
          </S.ModalBody>
          <S.ModalFooter>
            <CustomButton color="white" onClickEvent={deleteTransaction}>
              삭제
            </CustomButton>
            {validation.size > 5 && (
              <CustomButton color="blue" onClickEvent={updateTransaction}>
                저장
              </CustomButton>
            )}
          </S.ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TransactionUpdateModal;
