import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';
import authorization from './authorization/reducer';
import transaction from './transaction';
import fixedExpenditure from './fixedExpenditure';
import datePicker from './datePicker';
import updateModal from './updateModal';

const rootReducer = combineReducers({
  payment,
  category,
  transaction,
  authorization,
  fixedExpenditure,
  datePicker,
  updateModal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
