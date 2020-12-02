import { TransactionModel } from '@/commons/types/transaction';

export type AggregationByDateMap = Map<number, { totalIn: number; totalOut: number }>;
export type TransactionDetailsByDateMap = Map<number, TransactionModel[]>;
export type MostOutDateDetail = {
  amount: number;
  date: number;
};
export type MonthlyTransactionDetails = {
  totalIn: number;
  totalOut: number;
  mostOutDateDetail: MostOutDateDetail;
  aggregationByDate: [number, { totalIn: number; totalOut: number }][];
  transactionDetailsByDate: [number, TransactionModel[]][];
};

const groupByDate = (transactions: TransactionModel[]) => {
  const listByDate = new Map<number, TransactionModel[]>();

  transactions.forEach((transaction) => {
    const tradeDate = new Date(transaction.tradeAt).getDate();
    const list = listByDate.get(tradeDate) || [];
    list.push(transaction);
    listByDate.set(tradeDate, list);
  });

  return listByDate;
};

const aggregateByDate = (
  transactionDetailsMap: TransactionDetailsByDateMap,
): AggregationByDateMap => {
  const aggregationByDate = new Map<number, { totalIn: number; totalOut: number }>();
  transactionDetailsMap.forEach((transactions: TransactionModel[], tradeDate: number) => {
    const aggregateOfDate = transactions.reduce(
      (prevAggregate, transaction) => {
        if (transaction.isIncome) {
          return {
            ...prevAggregate,
            totalIn: prevAggregate.totalIn + transaction.amount,
          };
        }
        return {
          ...prevAggregate,
          totalOut: prevAggregate.totalOut + transaction.amount,
        };
      },
      { totalIn: 0, totalOut: 0 },
    );
    aggregationByDate.set(tradeDate, aggregateOfDate);
  });

  return aggregationByDate;
};

const aggregateIntegratedData = (aggregationByDateMap: AggregationByDateMap) => {
  let totalIn = 0;
  let totalOut = 0;
  const mostOutDateDetail: MostOutDateDetail = {
    amount: 0,
    date: 1,
  };

  aggregationByDateMap.forEach((aggregation, date) => {
    totalIn += aggregation.totalIn;
    totalOut += aggregation.totalOut;
    if (mostOutDateDetail.amount < aggregation.totalOut) {
      mostOutDateDetail.amount = aggregation.totalOut;
      mostOutDateDetail.date = date;
    }
  });

  return { totalIn, totalOut, mostOutDateDetail };
};

const aggregateTransactions = (transactions: TransactionModel[]) => {
  const transactionDetailsMap: TransactionDetailsByDateMap = groupByDate(transactions);
  const aggregationByDateMap: AggregationByDateMap = aggregateByDate(transactionDetailsMap);
  const integratedAggregation = aggregateIntegratedData(aggregationByDateMap);

  return {
    ...integratedAggregation,
    aggregationByDate: [...aggregationByDateMap.entries()],
    transactionDetailsByDate: [...transactionDetailsMap.entries()],
    transactions,
  };
};

export default aggregateTransactions;
