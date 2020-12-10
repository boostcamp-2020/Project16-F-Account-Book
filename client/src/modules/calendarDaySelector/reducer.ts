import { createReducer } from 'typesafe-actions';
import { CHANGE_DAY } from './action';
import { SelectDayState, SelectDayAction } from './type';

const day = 0;

const initialDayState: SelectDayState = {
  day,
};

const selectDayReducer = createReducer<SelectDayState, SelectDayAction>(initialDayState, {
  [CHANGE_DAY]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
});

export default selectDayReducer;
