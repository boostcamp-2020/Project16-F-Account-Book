export type FixedData = {
  fid: number;
  tradeAt: Date;
  amount: number;
  description: string;
};

export type FixedExpenditure = {
  paid: FixedData[];
  estimated: FixedData[];
};
