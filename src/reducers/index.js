import { combineReducers } from 'redux';

import userReducer from './user';
import cheatsReducer from './cheats';

const rootReducer = combineReducers({
  userReducer,
  cheatsReducer
});

export default rootReducer;
