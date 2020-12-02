import DateUtils from '@/libs/dateUtils';
import { createReducer } from 'typesafe-actions';
import { CHANGE_DATE } from './actions';
import { DatePickerState, DatePickerAction } from './types';

const { year, month } = DateUtils.parseDate(new Date());

const initialState: DatePickerState = {
  year,
  month,
};

const datePickerReducer = createReducer<DatePickerState, DatePickerAction>(initialState, {
  [CHANGE_DATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
});

export default datePickerReducer;
