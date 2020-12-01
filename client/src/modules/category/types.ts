import { CategoryModel } from '@commons/types/category';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type CategoryAction = ActionType<typeof actions>;

export type CategoryState = {
  categories: {
    loading: boolean;
    error: Error | null;
    data: CategoryModel[] | null;
  };
};
