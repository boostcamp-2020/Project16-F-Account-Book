import { ThunkAction } from 'redux-thunk';
import { $CombinedState, Dispatch } from 'redux';
import paymentAPI from '@libs/api/payment';
import { PaymentAction, PaymentState } from './types';
import { getPaymentAsync } from './actions';

type State = {
  readonly [$CombinedState]?: undefined;
} & { payment: PaymentState };

const getPaymentThunk = (): ThunkAction<void, State, null, PaymentAction> => async (
  dispatch: Dispatch,
) => {
  const { request, success, failure } = getPaymentAsync;
  dispatch(request());
  try {
    const payments = await paymentAPI.getPayment();
    dispatch(success(payments));
  } catch (e) {
    dispatch(failure(e));
    throw e;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getPaymentThunk };
