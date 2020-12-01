import { handleActions } from 'redux-actions';
import { LOGIN, LOGOUT } from './actions';

const initialState = {
  isLoggedIn: false,
};

const authorization = handleActions(
  {
    [LOGIN]: (state, action) => ({ isLoggedIn: true }),
    [LOGOUT]: (state, action) => ({ isLoggedIn: false }),
  },
  initialState,
);

export default authorization;
