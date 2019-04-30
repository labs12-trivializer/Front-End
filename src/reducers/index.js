import { combineReducers } from 'redux';

import answers from './answers';
import error from './error';

export default combineReducers({
  answers,
  error
});
