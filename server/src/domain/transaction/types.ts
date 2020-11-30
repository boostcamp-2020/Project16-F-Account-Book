import CategoryEntity from '@/entity/category.entity';
import PaymentEntity from '@/entity/payment.entity';
import UserEntity from '@/entity/user.entity';

export type Transaction = {
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  uid: number;
  cid: number;
  pid: number;
};

export type MonthlyTransactionDetailsQueryParams = {
  uid: number;
  year: number;
  month: number;
};

export type TransactionDetail = {
  tid: number;
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  uid: number;
  cid: number;
  pid: number;
  user: UserEntity;
  category: CategoryEntity;
  payment: PaymentEntity;
};

export type AggregationByDateMap = Map<number, { totalIn: number; totalOut: number }>;
export type TransactionDetailsByDateMap = Map<number, TransactionDetail[]>;
export type MostOutDateDetail = {
  amount: number;
  date: number;
};

export type MonthlyTransactionDetails = {
  totalIn: number;
  totalOut: number;
  mostOutDateDetail: MostOutDateDetail;
  aggregationByDate: [number, { totalIn: number; totalOut: number }][];
  transactionDetailsByDate: [number, TransactionDetail[]][];
};
