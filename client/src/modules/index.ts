import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';

const rootReducer = combineReducers({ payment, category, transaction, authorization });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
