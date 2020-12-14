import ManageHeader from '@/components/manage/ManageHeader';
import { RootState } from '@/modules';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageItem from '@/components/manage/ManageItem';
import PaymentDTO from '@/commons/dto/payment';
import ManageItemInput from '@/components/manage/ManageItemInput';
import {
  deletePaymentThunk,
  getPaymentThunk,
  postPaymentThunk,
  updatePaymentThunk,
} from '@/modules/payment';
import PaymentRequestDTO from '@/commons/dto/payment-request';
import { PaymentRequest } from '@/commons/types/payment';
import checkOverlap from '@/libs/checkOverlap';
import * as S from './styles';

const PaymentManageContainer = (): JSX.Element => {
  const { data } = useSelector((state: RootState) => state.payment);
  const paymentList = data.map((payment) => new PaymentDTO(payment));
  const [paymentData, setPaymentData] = useState({} as PaymentRequest);
  const [addPayment, setAddPayment] = useState(false);
  const dispatch = useDispatch();
  const checkValidation = checkOverlap(paymentData.name, paymentList);

  const getPaymentList = useCallback(() => {
    dispatch(getPaymentThunk());
  }, []);

  useEffect(() => {
    getPaymentList();
  }, []);

  const toggleAddPayment = useCallback(() => {
    setAddPayment(!addPayment);
  }, [addPayment]);

  const deletePayment = useCallback((pid) => {
    dispatch(deletePaymentThunk(pid));
  }, []);

  const onChangePaymentName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentData({ name: e.target.value });
    },
    [paymentData],
  );

  const postNewPayment = useCallback(() => {
    const newPayment = new PaymentRequestDTO(paymentData);
    dispatch(postPaymentThunk(newPayment));
    toggleAddPayment();
    setPaymentData({} as PaymentRequest);
  }, [paymentData]);

  const updatePayment = useCallback(
    (pid) => {
      if (checkValidation) {
        const updatePaymentData = new PaymentRequestDTO({ pid, ...paymentData });
        dispatch(updatePaymentThunk(updatePaymentData));
        setPaymentData({} as PaymentRequest);
      }
    },
    [paymentData],
  );

  return (
    <>
      <ManageHeader text="결제수단" onClick={toggleAddPayment} />
      {addPayment && (
        <ManageItemInput
          name={paymentData.name}
          cancelHandler={toggleAddPayment}
          saveHandler={postNewPayment}
          onChangeInput={onChangePaymentName}
          isValid={checkValidation}
          border
        />
      )}
      {paymentList.length !== 0 && (
        <S.ManageListContainer>
          {paymentList.map((payment) => (
            <ManageItem
              item={payment}
              deleteItem={deletePayment}
              updateItem={updatePayment}
              onChangeInput={onChangePaymentName}
              key={`m-payment${payment.id}`}
            />
          ))}
        </S.ManageListContainer>
      )}
    </>
  );
};

export default PaymentManageContainer;
