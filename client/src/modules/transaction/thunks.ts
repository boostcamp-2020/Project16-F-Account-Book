import transactionAPI from '@/libs/api/transaction';
import createAsyncThunk from '@/libs/createAsyncThunk';
import { postTransactionAsync, getMonthlyTransactionAsync } from './actions';

const postTransactionThunk = createAsyncThunk(postTransactionAsync, transactionAPI.postTransaction);
const getMonthlyTransactionThunk = createAsyncThunk(
  getMonthlyTransactionAsync,
  transactionAPI.getMonthlyTransaction,
);

export { postTransactionThunk, getMonthlyTransactionThunk };
