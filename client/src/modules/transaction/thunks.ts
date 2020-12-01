import transactionAPI from '@/libs/api/transaction';
import createAsyncThunk from '@/libs/createAsyncThunk';
import { PostTransactionRequest } from '@/commons/types/transaction';
import { postTransactionAsync } from './actions';

const postTransactionThunk = async (data: PostTransactionRequest) =>
  createAsyncThunk(postTransactionAsync, await transactionAPI.postTransaction(data));

// eslint-disable-next-line import/prefer-default-export
export { postTransactionThunk };
