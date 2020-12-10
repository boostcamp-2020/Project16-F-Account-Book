import transactionAPI from '@/libs/api/transaction';
import createAsyncThunk from '@/libs/createAsyncThunk';
import {
  postTransactionAsync,
  getMonthlyTransactionAsync,
  updateTransactionAsync,
  deleteTransactionAsync,
} from './actions';

const postTransactionThunk = createAsyncThunk(postTransactionAsync, transactionAPI.postTransaction);
const getMonthlyTransactionThunk = createAsyncThunk(
  getMonthlyTransactionAsync,
  transactionAPI.getMonthlyTransaction,
);
const updateTransactionThunk = createAsyncThunk(
  updateTransactionAsync,
  transactionAPI.updateTransaction,
);
const deleteTransactionThunk = createAsyncThunk(
  deleteTransactionAsync,
  transactionAPI.deleteTransaction,
);

export {
  postTransactionThunk,
  getMonthlyTransactionThunk,
  updateTransactionThunk,
  deleteTransactionThunk,
};
