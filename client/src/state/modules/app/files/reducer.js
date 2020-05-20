import {
  Status,
  SET_FILES,
  SET_FILE,
  DELETE_FILE
} from './actions';
import { RESET } from '../../app/index';

const initialState = {
  status: Status.INIT,
  byId: {},
  allIds: []
};


export default function filesReducer(state = initialState, action) {

  switch (action.type) {
    case DELETE_FILE: {
      const { fileId } = action.payload;
      const updatedById = { ...state.byId };
      delete updatedById[fileId];
      return {
        ...state,
        byId: updatedById,
        allIds: state.allIds.filter(id => id !== fileId)
      }
    }
    case SET_FILE: {
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
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
}