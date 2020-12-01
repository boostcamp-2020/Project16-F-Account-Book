import { combineReducers } from 'redux';
import payment from './payment';

const rootReducer = combineReducers({ payment });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
