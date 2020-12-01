import { createAction } from 'redux-actions';

export const LOGIN = 'login/LOGIN';
export const LOGOUT = 'login/LOGOUT';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
