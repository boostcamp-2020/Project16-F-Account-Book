export type TransactionModel = {
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

export type MonthTransactionsResponse = {
  totalIn: number;
  totalOut: number;
  mostOutDateDetail: {
    amount: number;
    date: number;
  };
  aggregationByDate: [number, { totalIn: number; totalOut: number }][];
  transactionDetailsByDate: [number, TransactionModel[]][];
};

export type PostTransactionRequest = {
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  cid: number;
  pid: number;
};
