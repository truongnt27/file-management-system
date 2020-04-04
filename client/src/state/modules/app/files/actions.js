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

export const ADD_FILE = `${namespace}/ADD_FILE`;

export const SET_FILES = `${namespace}/SET_FILES`;

export const uploadFile = (file = {}) => ({
  type: UPLOAD_FILE_SAGA,
  payload: {
    file
  }
})

export const setFiles = (files = []) => ({
  type: ADD_FILE,
  payload: {
    files
  }
})
