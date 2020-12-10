import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';
import fixedExpenditure from './fixedExpenditure';
import datePicker from './datePicker';
import aggregateCategory from './aggregateCategory';
import calendarDaySelector from './calendarDaySelector';


const rootReducer = combineReducers({
  payment,
  category,
  transaction,
  authorization,
  fixedExpenditure,
  calendarDaySelector,
  datePicker,
  aggregateCategory,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
