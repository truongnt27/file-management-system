import { Status, SET_FILES, ADD_FILE } from './actions';

const initialState = {
  status: Status.INIT,
  byId: {},
  allIds: []
};


export default function filesReducer(state = initialState, action) {

  switch (action.type) {
    case ADD_FILE: {
      const { file } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [file._id]: {
            ...file
          }
        },
        allIds: [...state.allIds, file._id]
      }
    }
    case SET_FILES: {
      const { files } = action.payload || [];
      let filesObj = {};

      files.forEach((file) => {
        filesObj[file._id] = { ...file };
      })

      return {
        status: Status.LOADED,
        byId: filesObj,
        allIds: Object.keys(filesObj)
      }
    }
    default:
      return state;
  }
}