import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';
import datePicker from './datePicker';

const rootReducer = combineReducers({ payment, category, transaction, authorization, datePicker });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
