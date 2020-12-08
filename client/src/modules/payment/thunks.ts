import paymentAPI from '@libs/api/payment';
import createAsyncThunk from '@libs/createAsyncThunk';
import {
  deletePaymentAsync,
  getPaymentAsync,
  postPaymentAsync,
  updatePaymentAsync,
} from './actions';

const getPaymentThunk = createAsyncThunk(getPaymentAsync, paymentAPI.getPayment);
const postPaymentThunk = createAsyncThunk(postPaymentAsync, paymentAPI.postPayment);
const updatePaymentThunk = createAsyncThunk(updatePaymentAsync, paymentAPI.updatePayment);
const deletePaymentThunk = createAsyncThunk(deletePaymentAsync, paymentAPI.deletePayment);

export { getPaymentThunk, postPaymentThunk, updatePaymentThunk, deletePaymentThunk };
