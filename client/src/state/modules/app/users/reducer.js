import { Status, SET_USERS } from './actions';

const initialState = {
  status: Status.INIT,
  byId: {},
  allIds: []
};

export default function usersReducer(state = initialState, action) {

  switch (action.type) {
    case SET_USERS: {
      const { users } = action.payload || [];
      let userObj = {};

      users.forEach((user) => {
        userObj[user._id] = { ...user };
      })

      return {
        status: Status.LOADED,
        byId: userObj,
        allIds: Object.keys(userObj)
      }
    }
    default:
      return state;
  }
}
