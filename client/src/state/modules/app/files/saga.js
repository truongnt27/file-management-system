import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import { getFilesApi, uploadFileApi } from 'helpers/filesApi';
import { Selectors } from 'state/modules/auth';

function* uploadFile(action) {
  const { file } = action.payload;
  const currentUser = yield select(Selectors.currentUser);
  const userId = currentUser._id;
  const res = yield uploadFileApi({ ...file, userId });

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.createKey(res.data.key))
  }
}

function* fetchFiles() {
  const currentUser = yield select(Selectors.currentUser);
  const res = yield getFilesApi();

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setKeys(res.data.keys))
  }
}

export default function* filesSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_FILES, fetchFiles),
    takeEvery(ActionTypes.UPLOAD_FILE_SAGA, uploadFile),
  ])
}