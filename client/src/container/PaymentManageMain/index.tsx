import ManageHeader from '@/components/manage/ManageHeader';
import { RootState } from '@/modules';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ManageItem from '@components/manage/ManageItem';
import PaymentDTO from '@/commons/dto/payment';
import ManageItemInput from '@/components/manage/ManageItemInput';
import * as S from './styles';

const PaymentManageContainer = (): JSX.Element => {
  const { data } = useSelector((state: RootState) => state.payment);
  const paymentList = data?.map((payment) => new PaymentDTO(payment));
  const [addPayment, setAddPayment] = useState(false);

  const toggleAddPayment = () => {
    setAddPayment(!addPayment);
  };

  return (
    <>
      <ManageHeader text="결제수단" onClick={toggleAddPayment} />
      <S.ManageListContainer>
        {paymentList &&
          paymentList.map((payment) => (
            <ManageItem
              item={payment}
              deleteItem={() => {
                console.log('삭제'); // delete 함수 전달을 test 하기 위한 console
              }}
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
