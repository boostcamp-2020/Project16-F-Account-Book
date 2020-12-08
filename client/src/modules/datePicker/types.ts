import { YearMonthModel, SelectDayModel } from '@/commons/types/date';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type DatePickerAction = ActionType<typeof actions>;

export type DatePickerState = YearMonthModel;

export type DayPickerAction = ActionType<typeof actions>;

export type DayPickerState = SelectDayModel;
