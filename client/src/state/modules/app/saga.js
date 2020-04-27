import { all, put, takeEvery } from 'redux-saga/effects';
import { BOOT, BOOT_FINISHED } from './';
import { API_STATUS_CODE } from 'helpers/constant';
import { getCurrentUser } from 'helpers/usersApi';
import { Actions } from 'state/modules/auth';

import { push } from 'connected-react-router';

function* boot() {

  const res = yield getCurrentUser();

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(Actions.authSuccess(res.data.user));
  }
  else yield put(push('/sign-in'));
  yield put({ type: BOOT_FINISHED });

}

export default function* appSaga() {
  yield all([
    takeEvery(BOOT, boot)
  ])
}