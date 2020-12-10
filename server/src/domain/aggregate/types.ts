export type AggregateData = {
  isIncome: boolean;
  category: string;
  aggregate: string;
  tid: number;
  amount: number;
  tradeAt: Date;
  description: string;
  payment: string;
};

export type CategoryData = {
  tid: number;
  amount: number;
  tradeAt: Date;
  description: string;
  payment: string;
};

export type AggregateValue = {
  category: string;
  aggregate: string;
  dataArray: CategoryData[];
};

export type AggregateResponse = {
  income: AggregateValue[];
  expenditure: AggregateValue[];
};

export type MaxCategory = {
  name: string;
  aggregate: string;
};
