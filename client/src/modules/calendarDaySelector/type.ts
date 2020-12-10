import { SelectDayModel } from '@/commons/types/calendar';
import { ActionType } from 'typesafe-actions';
import * as actions from './action';

export type SelectDayAction = ActionType<typeof actions>;

export type SelectDayState = SelectDayModel;
