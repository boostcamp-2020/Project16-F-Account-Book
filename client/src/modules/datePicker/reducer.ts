import DateUtils from '@/libs/dateUtils';
import { createReducer } from 'typesafe-actions';
import { CHANGE_DATE, CHANGE_DAY } from './actions';
import { DatePickerState, DatePickerAction, DayPickerState, DayPickerAction } from './types';

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

const day = 0;

const initialDayState: DayPickerState = {
  day,
};

const dayPickerReducer = createReducer<DayPickerState, DayPickerAction>(initialDayState, {
  [CHANGE_DAY]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
});

export { dayPickerReducer as dayPicker, datePickerReducer as datePicker };
