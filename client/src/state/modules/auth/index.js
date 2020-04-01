
import authReducer from './reducer';
import * as Actions from './actions';
import authSaga from './saga';

const namespace = 'auth';
const isAuthenticated = state => (state[namespace].status === Actions.Status.AUTH_SUCCESS) ? true : false;

export {
  namespace,
  authReducer,
  Actions,
  authSaga,
  isAuthenticated
}