export type Transaction = {
  tid: number;
  amount: number;
  tradeAt: string;
  description: string;
  isIncome: boolean;
  uid: number;
  cid: number;
  pid: number;
  payment: {
    pid: number;
    name: string;
    uid: number;
  };
  category: {
    cid: number;
    name: string;
    isIncome: boolean;
    uid: number;
  };
};

export type TransactionListItemPropType = {
  transaction: Transaction;
};
