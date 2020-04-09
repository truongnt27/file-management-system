export const namespace = 'files';

export const Status = {
  INIT: 'INIT',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
}

export const FETCH_FILES = `${namespace}/FETCH_FILES`;
export const FETCH_FILES_SUCCESS = `${namespace}/FETCH_FILES_SUCCESS`;
export const FETCH_FILES_FAILED = `${namespace}/FETCH_FILES_FAILED`;

export const UPLOAD_FILE_SAGA = `${namespace}/UPLOAD_FILE_SAGA`;

export const SET_FILE = `${namespace}/SET_FILE`;

export const SET_FILES = `${namespace}/SET_FILES`;

export const uploadFile = (file: File, keyId) => ({
  type: UPLOAD_FILE_SAGA,
  payload: {
    file,
    keyId
  }
})

export const setFiles = (files = []) => ({
  type: SET_FILES,
  payload: {
    files
  }
})

export const setFile = (file = {}) => ({
  type: SET_FILE,
  payload: {
    file
  }
})
