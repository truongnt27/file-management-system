import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../modules/auth';
import { usersSaga } from '../modules/app/users';
import { keysSaga } from '../modules/app/keys';
import { filesSaga } from '../modules/app/files';
import { logsSaga } from '../modules/app/logs';

export default function* sagas() {
  yield all([
    fork(authSaga),
    fork(usersSaga),
    fork(keysSaga),
    fork(filesSaga),
    fork(logsSaga)
  ]);
}