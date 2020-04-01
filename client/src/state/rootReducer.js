// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer, namespace as AuthN } from './modules/auth';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  [AuthN]: authReducer
})
export default createRootReducer;