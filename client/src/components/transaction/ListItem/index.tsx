import React from 'react';
import AmountText from '@/components/transaction/AmountText';
import { TransactionListItemPropType } from './types';
import S from './styles';

const TransactionListItem = ({ transaction }: TransactionListItemPropType): JSX.Element => {
  return (
    <S.ListItem>
      <S.ListItemContentsRow>
        <S.ListItemDescription>{transaction.description}</S.ListItemDescription>
      </S.ListItemContentsRow>
      <S.ListItemContentsRow>
        <S.ListItemPaymentInfo>
          {transaction.category.name} | {transaction.payment.name}
        </S.ListItemPaymentInfo>
        <S.ListItemAmount>
          <AmountText isIncome={transaction.isIncome} amount={transaction.amount} size="sm" />
        </S.ListItemAmount>
      </S.ListItemContentsRow>
    </S.ListItem>
  );
};

export default TransactionListItem;
