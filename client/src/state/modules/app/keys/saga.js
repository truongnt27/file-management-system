import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE, TOAST_TYPE } from 'helpers/constant';
import {
  createKeyApi,
  updateKeyApi,
  deleteKeyApi,
  getKeysApi
} from 'helpers/keysApi';

import { Selectors } from 'state/modules/auth';

import { push } from 'connected-react-router';
import { showToast } from '../../notification';

function* createKey(action) {
  const { key } = action.payload;
  const currentUser = yield select(Selectors.currentUser);
  const userId = currentUser._id;
  const res = yield createKeyApi({ ...key, owner: userId });

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.createKey(res.data.key))
    const toast = {
      message: 'Create key succesfully !',
      type: TOAST_TYPE.SUCCESS
    }
    yield put(showToast(toast));

    yield put(push('/keys'));
  } else {
    const toast = {
      message: 'Create key failed!',
      type: TOAST_TYPE.FAILED
    }
    yield put(showToast(toast));
    yield put(push('/keys'));
  }
}

function* updateKey(action) {
  const { key } = action.payload;
  const res = yield updateKeyApi(key);

  if (res.error) {
    const toast = {
      message: 'Something went wrong !',
      type: TOAST_TYPE.FAILED
    }
    yield put(showToast(toast));
  }

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.createKey(res.data.key));
    const toast = {
      message: 'Update key succesfully !',
      type: TOAST_TYPE.SUCCESS
    }
    yield put(showToast(toast));
    yield put(push('/keys'));
  }
}

function* deleteKey(action) {
  const { keyId } = action.payload;

  yield put(ActionTypes.deleteKey(keyId))
  yield put(push('/keys'));

  const res = yield deleteKeyApi(keyId);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    //
  }
}

function* fetchKeys() {
  const currentUser = yield select(Selectors.currentUser);

  yield put({ type: ActionTypes.SET_LOADING_KEYS });
  const res = yield getKeysApi();

  if (res.error) {
    const toast = {
      message: 'Something went wrong !',
      type: TOAST_TYPE.FAILED
    }
    yield put(showToast(toast));
  }
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