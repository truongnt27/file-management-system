import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';
import {
  getLogsApi
} from 'helpers/logsApi';

import { Selectors } from 'state/modules/auth';

function* fetchLogs() {
  const currentUser = yield select(Selectors.currentUser);
  const res = yield getKeysApi();

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setLogs(res.data.logs));
  }
}

export default function* logsSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_LOGS, fetchLogs)
  ])
}