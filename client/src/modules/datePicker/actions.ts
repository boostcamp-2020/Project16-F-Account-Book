import { YearMonthModel } from '@/commons/types/date';

type ChangeDateActionType = {
  type: string;
  payload: YearMonthModel;
};

export const CHANGE_DATE = 'date/CHANGE_DATE';

export const changeDate = (date: YearMonthModel): ChangeDateActionType => ({
  type: CHANGE_DATE,
  payload: date,
});
