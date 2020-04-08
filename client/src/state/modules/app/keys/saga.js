import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import {
  createKeyApi,
  updateKeyApi,
  deleteKeyApi,
  getKeysApi
} from 'helpers/keysApi';

import { Selectors } from 'state/modules/auth';

import { push } from 'connected-react-router';

function* createKey(action) {
  const { key } = action.payload;
  const currentUser = yield select(Selectors.currentUser);
  const userId = currentUser._id;
  const res = yield createKeyApi({ ...key, owner: userId });

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.createKey(res.data.key))
    yield put(push('/keys'));
  }
}

function* updateKey(action) {
  const { key } = action.payload;
  const res = yield updateKeyApi(key);

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.createKey(res.data.key))
    yield put(push('/keys'));
  }
}

function* deleteKey(action) {
  const { keyId } = action.payload;

  yield put(ActionTypes.deleteKey(keyId))
  yield put(push('/keys'));

  const res = yield deleteKeyApi(keyId);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    console.log('success');
  }
}

function* fetchKeys() {
  const currentUser = yield select(Selectors.currentUser);
  const res = yield getKeysApi();

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setKeys(res.data.keys))
  }
}

export default function* keysSaga() {
  yield all([
    takeEvery(ActionTypes.CREATE_KEY_SAGA, createKey),
    takeEvery(ActionTypes.FETCH_KEYS, fetchKeys),
    takeEvery(ActionTypes.UPDATE_KEY_SAGA, updateKey),
    takeEvery(ActionTypes.DELETE_KEY_SAGA, deleteKey)
  ])
}