/* eslint-disable camelcase */
export type FixedType = {
  fid: number;
  tradeAt: Date;
  amount: number;
  description: string;
};

export type InputType = {
  tradeAt: Date;
  amount: number;
  description: string;
  uid: number;
};

export type ResultType = {
  fid: number;
  tradeAt: Date;
  estimatedAmount: number;
  description: string;
  paidAmount: number | null;
};

export type ResponseType = {
  paid: FixedType[];
  estimated: FixedType[];
};
