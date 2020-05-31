// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer, namespace as authN } from './modules/auth';
import { usersReducer, namespace as usersN } from './modules/app/users';
import { filesReducer, namespace as filesN } from './modules/app/files';
import { logsReducer, namespace as logsN } from './modules/app/logs';
import { notificationReducer, namespace as notificationN } from './modules/notification';
import { namespace, reducer } from './modules/app';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  [namespace]: reducer,
  [authN]: authReducer,
  [usersN]: usersReducer,
  [filesN]: filesReducer,
  [logsN]: logsReducer,
  [notificationN]: notificationReducer
})
export default createRootReducer;