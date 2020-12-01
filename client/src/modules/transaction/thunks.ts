import transactionAPI from '@/libs/api/transaction';
import createAsyncThunk from '@/libs/createAsyncThunk';
import { postTransactionAsync } from './actions';

const postTransactionThunk = createAsyncThunk(postTransactionAsync, transactionAPI.postTransaction);

// eslint-disable-next-line import/prefer-default-export
export { postTransactionThunk };
