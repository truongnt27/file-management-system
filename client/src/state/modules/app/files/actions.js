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
export const DOWNLOAD_FILE_SAGA = `${namespace}/DOWNLOAD_FILE_SAGA`;
export const DELETE_FILE_SAGA = `${namespace}/DELETE_FILE_SAGA`;
export const DELETE_FILE = `${namespace}/DELETE_FILE`;
export const MOVE_FILES_TO_TRASH_SAGA = `${namespace}/MOVE_FILES_TO_TRASH_SAGA`;
export const MOVE_FILES_TO_TRASH = `${namespace}/MOVE_FILES_TO_TRASH`;

export const SET_FILE = `${namespace}/SET_FILE`;
export const SET_FILES = `${namespace}/SET_FILES`;

export const UPDATE_FILE_SAGA = `${namespace}/UPDATE_FILE_SAGA`;

export const moveFilesToTrashSaga = (fileIds = []) => ({
  type: MOVE_FILES_TO_TRASH_SAGA,
  payload: {
    fileIds
  }
})

export const moveFilesToTrash = (fileIds = []) => ({
  type: MOVE_FILES_TO_TRASH,
  payload: {
    fileIds
  }
})

export const uploadFile = (file: File) => ({
  type: UPLOAD_FILE_SAGA,
  payload: {
    file
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
export const downloadFile = (fileId) => ({
  type: DOWNLOAD_FILE_SAGA,
  payload: {
    fileId
  }
})
export const deleteFileSaga = (fileId) => ({
  type: DELETE_FILE_SAGA,
  payload: {
    fileId
  }
})
export const deleteFile = (fileId) => ({
  type: DELETE_FILE,
  payload: {
    fileId
  }
})

export const updateFileSaga = (file) => ({
  type: UPDATE_FILE_SAGA,
  payload: {
    file
  }
})
