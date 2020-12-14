import { YearMonthModel } from '@/commons/types/date';
import { TransactionModel } from '@/commons/types/transaction';

const cache: Map<string, TransactionModel[]> = new Map();

const makeDateKey = ({ year, month }: YearMonthModel): string => `${year}-${month}`;

const set = ({ date, list }: { date: YearMonthModel; list: TransactionModel[] }): void => {
  const dateKey = makeDateKey(date);
  cache.set(dateKey, list);
};

const get = (
  date: YearMonthModel,
): { date: YearMonthModel; list: TransactionModel[] } | undefined => {
  const dateKey = makeDateKey(date);
  const list = cache.get(dateKey);
  if (list) {
    return { date, list: [...Array.from(list)] };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
