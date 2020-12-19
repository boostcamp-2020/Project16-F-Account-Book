import CategoryEntity from '@/entity/category.entity';
import PaymentEntity from '@/entity/payment.entity';
import UserEntity from '@/entity/user.entity';

export type TransactionFormData = {
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
  paymentName: string;
  categoryName: string;
};
