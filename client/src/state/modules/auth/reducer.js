import { Status, AUTH_USER_SUCCESS } from './actions';
import { RESET } from '../app/index';

const initialState = {
  status: Status.INIT,
  user: {
    email: '',
    fullname: '',
    type: 'User',
    files: [],
    keyList: []
  }
};

export default function authReducer(state = initialState, action) {

  switch (action.type) {
    case AUTH_USER_SUCCESS: {
      const { user } = action.payload || {};
      return {
        ...state,
        status: Status.AUTH_SUCCESS,
        user
      }
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
