import { TransactionModel } from '@/commons/types/transaction';

export type TransactionListItemPropType = {
  transaction: TransactionModel;
  editable?: boolean;
  toggleUpdateModal?: () => void;
};

export type ImgContainerProps = {
  editable: boolean;
};
