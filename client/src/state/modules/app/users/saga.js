import { all, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import { fetchUsersApi, createUserApi } from 'helpers/usersApi';

function* fetchUsers() {
  const res = yield fetchUsersApi();
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUsers(res.data.users))
  }
}

function* createUser(action) {
  const { user } = action.payload;
  console.log('saga', user);

  const res = yield createUserApi(user);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUser(res.data.user))
  }
}

export default function* usersSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_USERS, fetchUsers),
    takeEvery(ActionTypes.CREATE_USER_SAGA, createUser),
  ])
}