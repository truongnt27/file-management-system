import { all, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_NOTIFIS,
  CREATE_NOTIFI_SAGA,
  MARK_AS_READ_SAGA,
  setNotifications,
  markAsRead
} from './index';
import { API_STATUS_CODE } from 'helpers/constant';
import {
  getNotificationsApi,
  createNotificationApi,
  markNotificationAsReadApi
} from 'helpers/notificationApi';


function* fetchNotifis() {
  const res = yield getNotificationsApi();
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(setNotifications(res.data.notifications));
  }
}

function* createNotifi(action) {
  const { notification } = action.payload;
  const res = yield createNotificationApi(notification);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    // DO NOTHING
  }
}

function* markAsReadNoti(action) {
  const { ids } = action.payload;
  yield put(markAsRead(ids));
  yield all(ids.map(id => markNotificationAsReadApi(id)));
}

export default function* notificationSaga() {
  yield all([
    takeEvery(FETCH_NOTIFIS, fetchNotifis),
    takeEvery(CREATE_NOTIFI_SAGA, createNotifi),
    takeEvery(MARK_AS_READ_SAGA, markAsReadNoti)
  ])
}