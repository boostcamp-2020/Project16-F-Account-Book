import fixedExpenditureAPI from '@libs/api/fixedExpenditure';
import createAsyncThunk from '@libs/createAsyncThunk';
import { getFixedExpenditureAsync } from './actions';

const getFixedExpenditureThunk = createAsyncThunk(
  getFixedExpenditureAsync,
  fixedExpenditureAPI.getFixedExpenditure,
);

// eslint-disable-next-line import/prefer-default-export
export { getFixedExpenditureThunk };
