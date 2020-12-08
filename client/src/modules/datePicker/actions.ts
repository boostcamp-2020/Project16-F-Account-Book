import { YearMonthModel, SelectDayModel } from '@/commons/types/date';

type ChangeDateActionType = {
  type: string;
  payload: YearMonthModel;
};

export const CHANGE_DATE = 'date/CHANGE_DATE';

export const changeDate = (date: YearMonthModel): ChangeDateActionType => ({
  type: CHANGE_DATE,
  payload: date,
});

type ChangeDayActionType = {
  type: string;
  payload: SelectDayModel;
};

export const CHANGE_DAY = 'day/CHANGE_DAY';

export const changeDay = (date: SelectDayModel): ChangeDayActionType => ({
  type: CHANGE_DAY,
  payload: date,
});
