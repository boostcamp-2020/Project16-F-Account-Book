import { TransactionModel } from '@/commons/types/transaction';

export type TransactionListItemPropType = {
  transaction: TransactionModel;
  border?: boolean | null;
  toggleUpdateModal?: () => void;
};

export type TransactionListItemStylePropType = {
  border: boolean;
};
