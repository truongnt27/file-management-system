// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer, namespace as authN } from './modules/auth';
import { usersReducer, namespace as usersN } from './modules/app/users';
import { keysReducer, namespace as keysN } from './modules/app/keys';
import { filesReducer, namespace as filesN } from './modules/app/files';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  [authN]: authReducer,
  [usersN]: usersReducer,
  [keysN]: keysReducer,
  [filesN]: filesReducer
})
export default createRootReducer;