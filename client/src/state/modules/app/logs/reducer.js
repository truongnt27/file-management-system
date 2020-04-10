import { Status, SET_LOGS } from './actions';

const initialState = {
  status: Status.INIT,
  byId: {},
  allIds: []
};

export default function logsReducer(state = initialState, action) {

  switch (action.type) {

    case SET_LOGS: {
      const { logs } = action.payload || [];
      let logsObj = {};

      logs.forEach((log) => {
        logsObj[log._id] = { ...log };
      })

      return {
        status: Status.LOADED,
        byId: logsObj,
        allIds: Object.keys(logsObj)
      }
    }
    default:
      return state;
  }
}
