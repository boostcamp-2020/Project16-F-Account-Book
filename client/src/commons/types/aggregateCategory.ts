export type CategoryData = {
  tid: number;
  amount: number;
  tradeAt: Date;
  description: string;
  payment: string;
};

export type AggregateList = {
  category: string;
  aggregate: string;
  dataArray: CategoryData[];
};

export type AggregateData = {
  income: AggregateList[];
  expenditure: AggregateList[];
};

export type AggregateCategoryPropType = {
  list: AggregateList[];
  isIncome: boolean;
};

export type AggregateCategoryItemPropType = {
  item: AggregateList;
  total: number;
};

export type AggregateCategoryDayPropType = {
  day: Date;
};
