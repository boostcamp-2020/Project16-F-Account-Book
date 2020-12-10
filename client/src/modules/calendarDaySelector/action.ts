import { SelectDayModel } from '@/commons/types/calendar';

type ChangeDayActionType = {
  type: string;
  payload: SelectDayModel;
};

export const CHANGE_DAY = 'day/CHANGE_DAY';

export const changeDay = (date: SelectDayModel): ChangeDayActionType => ({
  type: CHANGE_DAY,
  payload: date,
});
