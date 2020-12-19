import { createReducer } from 'typesafe-actions';
import { TOGGLE_ON, TOGGLE_OFF } from './actions';
import { UpdateModalAction, UpdateModalState } from './types';

const initialState: UpdateModalState = {
  toggle: false,
  data: null,
};

const updateModalReducer = createReducer<UpdateModalState, UpdateModalAction>(initialState, {
  [TOGGLE_ON]: (state, { payload }) => ({
    toggle: true,
    data: payload,
  }),
  [TOGGLE_OFF]: (state) => ({
    toggle: false,
    data: null,
  }),
});

export default updateModalReducer;
