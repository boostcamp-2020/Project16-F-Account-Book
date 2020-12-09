import ManageHeader from '@/components/manage/ManageHeader';
import { RootState } from '@/modules';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageItem from '@/components/manage/ManageItem';
import PaymentDTO from '@/commons/dto/payment';
import ManageItemInput from '@/components/manage/ManageItemInput';
import { deletePaymentThunk, postPaymentThunk, updatePaymentThunk } from '@/modules/payment';
import PaymentRequestDTO from '@/commons/dto/payment-request';
import { PaymentRequest } from '@/commons/types/payment';
import * as S from './styles';

const PaymentManageContainer = (): JSX.Element => {
  const { data } = useSelector((state: RootState) => state.payment);
  const paymentList = data.map((payment) => new PaymentDTO(payment));
  const [paymentData, setPaymentData] = useState({} as PaymentRequest);
  const [addPayment, setAddPayment] = useState(false);
  const dispatch = useDispatch();

  const toggleAddPayment = useCallback(() => {
    setAddPayment(!addPayment);
  }, [addPayment]);

  const deletePayment = useCallback(
    (pid) => {
      dispatch(deletePaymentThunk(pid));
    },
    [dispatch],
  );

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
  }, [dispatch, paymentData]);

  const updatePayment = useCallback(
    (pid) => {
      const updatePaymentData = new PaymentRequestDTO({ pid, ...paymentData });
      dispatch(updatePaymentThunk(updatePaymentData));
      setPaymentData({} as PaymentRequest);
    },
    [dispatch, paymentData],
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
          border
        />
      )}
      <S.ManageListContainer>
        {paymentList.map((payment) => (
          <ManageItem
            value={paymentData.name}
            item={payment}
            deleteItem={deletePayment}
            updateItem={updatePayment}
            onChangeInput={onChangePaymentName}
            key={`m-payment${payment.id}`}
          />
        ))}
      </S.ManageListContainer>
    </>
  );
};

export default PaymentManageContainer;
