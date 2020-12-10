import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';
import fixedExpenditure from './fixedExpenditure';
import datePicker from './datePicker';
import aggregateCategory from './aggregateCategory';

const rootReducer = combineReducers({
  payment,
  category,
  transaction,
  authorization,
  fixedExpenditure,
  datePicker,
  aggregateCategory,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
