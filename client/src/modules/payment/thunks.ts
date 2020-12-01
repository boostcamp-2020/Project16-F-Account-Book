import paymentAPI from '@libs/api/payment';
import createAsyncThunk from '@libs/createAsyncThunk';
import { getPaymentAsync } from './actions';

const getPaymentThunk = createAsyncThunk(getPaymentAsync, paymentAPI.getPayment);

// eslint-disable-next-line import/prefer-default-export
export { getPaymentThunk };
