import { ActionType } from 'typesafe-actions';
import { PaymentModel } from '@commons/types/payment';
import * as actions from './actions';

export type PaymentAction = ActionType<typeof actions>;

export type PaymentState = {
  payments: {
    loading: boolean;
    error: Error | null;
    data: PaymentModel[] | null;
  };
};
