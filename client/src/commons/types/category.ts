export type CategoryModel = {
  cid: number;
  name: string;
  isIncome: boolean;
  uid: number;
};

export type CategoryRequest = {
  cid?: number;
  name: string;
  isIncome: boolean;
};
