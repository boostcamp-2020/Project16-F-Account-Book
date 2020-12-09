import categoryAPI from '@libs/api/category';
import createAsyncThunk from '@libs/createAsyncThunk';
import {
  deleteCategoryAsync,
  getCategoryAsync,
  postCategoryAsync,
  updateCategoryAsync,
} from './actions';

const getCategoryThunk = createAsyncThunk(getCategoryAsync, categoryAPI.getCategory);
const postCategoryThunk = createAsyncThunk(postCategoryAsync, categoryAPI.postCategory);
const updateCategoryThunk = createAsyncThunk(updateCategoryAsync, categoryAPI.updateCategory);
const deleteCategoryThunk = createAsyncThunk(deleteCategoryAsync, categoryAPI.deleteCategory);

export { getCategoryThunk, postCategoryThunk, updateCategoryThunk, deleteCategoryThunk };
