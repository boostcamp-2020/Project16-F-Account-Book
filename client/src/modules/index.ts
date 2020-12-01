import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import transaction from './transaction';

const rootReducer = combineReducers({ payment, category, transaction });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
