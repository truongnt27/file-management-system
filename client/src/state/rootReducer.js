// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer, namespace as authN } from './modules/auth';
import { usersReducer, namespace as userN } from './modules/app/users';
import { namespace as keysN, keysReducer } from './modules/app/keys';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  [authN]: authReducer,
  [userN]: usersReducer,
  [keysN]: keysReducer
})
export default createRootReducer;