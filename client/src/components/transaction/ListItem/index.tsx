import React from 'react';
import AmountText from '@/components/transaction/AmountText';
import pencilIcon from '@/assets/svg/Pencil.svg';
import { TransactionListItemPropType } from './types';
import S from './styles';

const TransactionListItem = ({
  transaction,
  toggleUpdateModal,
  editable = false,
}: TransactionListItemPropType): JSX.Element => {
  return (
    <S.ListItem>
      <S.ListItemContentsRow>
        <S.ListItemDescription>{transaction.description}</S.ListItemDescription>
        <S.ListIteImgContainer editable={editable} onClick={toggleUpdateModal}>
          <img src={pencilIcon} alt="updateIcon" />
        </S.ListIteImgContainer>
      </S.ListItemContentsRow>
      <S.ListItemContentsRow>
        <S.ListItemPaymentInfo>
          {transaction.categoryName} | {transaction.paymentName}
        </S.ListItemPaymentInfo>
        <S.ListItemAmount>
          <AmountText isIncome={transaction.isIncome} amount={transaction.amount} size="sm" />
        </S.ListItemAmount>
      </S.ListItemContentsRow>
    </S.ListItem>
  );
};

export default TransactionListItem;
