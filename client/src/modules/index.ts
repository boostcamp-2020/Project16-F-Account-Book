import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';

const rootReducer = combineReducers({ payment, category, authorization });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
