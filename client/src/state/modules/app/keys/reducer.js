import { Status, CREATE_KEY, DELETE_KEY, SET_KEYS } from './actions';

const initialState = {
  status: Status.INIT,
  byId: {},
  allIds: []
};

export default function keysReducer(state = initialState, action) {

  switch (action.type) {
    case CREATE_KEY: {
      const { key } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [key._id]: {
            ...key
          }
        },
        allIds: [...state.allIds, key._id]
      }
    }
    case DELETE_KEY: {
      const { keyId } = action.payload;
      const updatedById = { ...state.byId };
      delete updatedById[keyId];
      return {
        ...state,
        byId: updatedById,
        allIds: state.allIds.filter(id => id !== keyId)
      }
    }
    case SET_KEYS: {
      const { keys } = action.payload || [];
      let keysObj = {};

      keys.forEach((key) => {
        keysObj[key._id] = { ...key };
      })

      return {
        status: Status.LOADED,
        byId: keysObj,
        allIds: Object.keys(keysObj)
      }
    }
    default:
      return state;
  }
}