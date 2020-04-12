import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as Actions from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import { getFilesApi, uploadFileApi, downloadFileApi } from 'helpers/filesApi';
import { Selectors } from 'state/modules/auth';
import { getFileById } from 'state/modules/app/files/selector';
import { push } from 'connected-react-router';
import { saveAs } from 'file-saver';

function* uploadFile(action) {
  const { file, keyId } = action.payload;
  const currentUser = yield select(Selectors.currentUser);
  const userId = currentUser._id;

  const res = yield uploadFileApi(file, keyId, userId);

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(Actions.setFile(res.data.file));
    yield put(push('/files'));
  }
}

function* downloadFile(action) {
  const { fileId } = action.payload;
  const res = yield downloadFileApi(fileId);
  if (res.error) {
    console.log(res);
  }
  else {
    const file = yield select(state => getFileById(state)(fileId));
    const saveAsName = file.name || 'download.txt';
    saveAs(new Blob([res]), saveAsName);
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
    takeEvery(Actions.DOWNLOAD_FILE_SAGA, downloadFile),
  ])
}