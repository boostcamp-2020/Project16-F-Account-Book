import { TransactionModel } from '@/commons/types/transaction';

export type TransactionListItemPropType = {
  transaction: TransactionModel;
  border?: boolean | null;
};

export type TransactionListItemStylePropType = {
  border: boolean;
};
