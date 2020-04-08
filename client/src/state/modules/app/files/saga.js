import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as Actions from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import { getFilesApi, uploadFileApi } from 'helpers/filesApi';
import { Selectors } from 'state/modules/auth';
import { push } from 'connected-react-router';

function* uploadFile(action) {
  const { file } = action.payload;
  const currentUser = yield select(Selectors.currentUser);
  const userId = currentUser._id;

  const res = yield uploadFileApi(file, userId);

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(Actions.setFile(res.data.file));
    yield put(push('/files'));
  }
}

function* fetchFiles() {
  const currentUser = yield select(Selectors.currentUser);
  const res = yield getFilesApi();

  if (res.status === API_STATUS_CODE.SUCCESS) {
    console.log('get data success');

    yield put(Actions.setFiles(res.data.files))
  }
}

export default function* filesSaga() {
  yield all([
    takeEvery(Actions.FETCH_FILES, fetchFiles),
    takeEvery(Actions.UPLOAD_FILE_SAGA, uploadFile),
  ])
}