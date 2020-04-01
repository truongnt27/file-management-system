import { Status, AUTH_USER_SUCCESS } from './actions';

const initialState = {
  status: Status.INIT,
  user: {}
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
    default:
      return state;
  }
}
