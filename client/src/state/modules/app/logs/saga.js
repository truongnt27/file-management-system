import { all, put, select, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { API_STATUS_CODE } from 'helpers/constant';

import {
  getLogsApi
} from 'helpers/logsApi';

function* fetchLogs(action) {
  const { fromDate, toDate } = action.payload;
  const res = yield getLogsApi(fromDate, toDate);

  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(ActionTypes.setLogs(res.data.logs));
  }
}

export default function* logsSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_LOGS, fetchLogs)
  ])
}