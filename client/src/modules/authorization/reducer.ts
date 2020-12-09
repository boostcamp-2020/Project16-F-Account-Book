import { handleActions } from 'redux-actions';
import { LOGIN, LOGOUT } from './actions';
import { AuthorizationState } from './types';

const initialState: AuthorizationState = {
  createAt: null,
};

const authorization = handleActions(
  {
    [LOGIN]: (state, action) => ({ createAt: action.payload.createAt }),
    [LOGOUT]: (state, action) => ({ createAt: null }),
  },
  initialState,
);

export default authorization;
