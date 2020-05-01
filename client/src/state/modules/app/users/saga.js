import { all, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE, TOAST_TYPE } from 'helpers/constant';
import { fetchUsersApi, createUserApi, updateUserApi } from 'helpers/usersApi';
import { showToast } from 'state/modules/notification';

function* fetchUsers() {
  const res = yield fetchUsersApi();
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUsers(res.data.users))
  }
}

function* createUser(action) {
  const { user } = action.payload;
  const res = yield createUserApi(user);

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUser(res.data.user));
    const toast = {
      message: 'Create user succesfully !',
      type: TOAST_TYPE.SUCCESS
    }
    yield put(showToast(toast));
  }
  else {
    const toast = {
      message: 'Create user failed !',
      type: TOAST_TYPE.FAILED
    }
    yield put(showToast(toast));
  }
}

function* editUser(action) {
  const { user } = action.payload;

  const res = yield updateUserApi(user);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUser(res.data.user))
  }
}

export default function* usersSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_USERS, fetchUsers),
    takeEvery(ActionTypes.CREATE_USER_SAGA, createUser),
    takeEvery(ActionTypes.EDIT_USER_SAGA, editUser)
  ])
}