import ManageHeader from '@/components/manage/ManageHeader';
import { RootState } from '@/modules';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageItem from '@/components/manage/ManageItem';
import PaymentDTO from '@/commons/dto/payment';
import ManageItemInput from '@/components/manage/ManageItemInput';
import { deletePaymentThunk } from '@/modules/payment';
import * as S from './styles';

const PaymentManageContainer = (): JSX.Element => {
  const { data } = useSelector((state: RootState) => state.payment);
  const paymentList = data.map((payment) => new PaymentDTO(payment));
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

  return (
    <>
      <ManageHeader text="결제수단" onClick={toggleAddPayment} />
      <S.ManageListContainer>
        {paymentList.map((payment) => (
          <ManageItem
            item={payment}
            deleteItem={deletePayment}
            updateItem={() => {
              console.log('업데이트'); // update 함수 전달을 test하기 위한 console
            }}
          />
        ))}
      </S.ManageListContainer>
      {addPayment && <ManageItemInput name="" cancelHandler={toggleAddPayment} />}
    </>
  );
};

export default PaymentManageContainer;
