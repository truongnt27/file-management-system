import { all, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import { fetchUsersApi } from 'helpers/usersApi';

function* fetchUsers() {
  const res = yield fetchUsersApi();
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setUsers(res.data.users))
  }
}

export default function* usersSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_USERS, fetchUsers)
  ])
}