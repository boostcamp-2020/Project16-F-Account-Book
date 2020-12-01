export type AggregateData = {
  category: string;
  aggregate: string;
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  payment: string;
};

type CategoryData = {
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  payment: string;
};

export type AggregateResponse = {
  category: string;
  aggregate: string;
  list: Array<CategoryData>;
};

export type MaxCategory = {
  name: string;
  aggregate: string;
};
