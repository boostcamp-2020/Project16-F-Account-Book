import { TransactionModel } from '@/commons/types/transaction';

type ToggleModalActionType = {
  type: string;
  payload: TransactionModel;
};

export const TOGGLE_ON = 'modal/TOGGLE_ON';
export const TOGGLE_OFF = 'modal/TOGGLE_OFF';

export const toggleModalOn = (transaction: TransactionModel): ToggleModalActionType => ({
  type: TOGGLE_ON,
  payload: transaction,
});

export const toggleModalOff = (): ToggleModalActionType => ({
  type: TOGGLE_OFF,
  payload: {} as TransactionModel,
});
