import categoryAPI from '@libs/api/category';
import createAsyncThunk from '@libs/createAsyncThunk';
import { getCategoryAsync } from './actions';

const getCategoryThunk = createAsyncThunk(getCategoryAsync, categoryAPI.getCategory);

// eslint-disable-next-line import/prefer-default-export
export { getCategoryThunk };
