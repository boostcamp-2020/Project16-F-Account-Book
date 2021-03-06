import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';
import fixedExpenditure from './fixedExpenditure';
import datePicker from './datePicker';
import updateModal from './updateModal';
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
  updateModal,
  aggregateCategory,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
