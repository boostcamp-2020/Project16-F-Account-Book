import { combineReducers } from 'redux';
import payment from './payment';
import category from './category';

const rootReducer = combineReducers({ payment, category });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
