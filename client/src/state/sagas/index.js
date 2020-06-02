import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../modules/auth';
import { usersSaga } from '../modules/app/users';
import { filesSaga } from '../modules/app/files';
import { logsSaga } from '../modules/app/logs';
import notificationSaga from '../modules/notification/saga';
import appSaga from '../modules/app/saga';

export default function* sagas() {
  yield all([
    fork(appSaga),
    fork(authSaga),
    fork(usersSaga),
    fork(filesSaga),
    fork(logsSaga),
    fork(notificationSaga)
  ]);
}