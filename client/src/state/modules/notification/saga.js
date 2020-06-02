import { all, put, takeEvery } from 'redux-saga/effects';
import { FETCH_NOTIFIS, CREATE_NOTIFI_SAGA, setNotifications, createNotification } from './index';
import { API_STATUS_CODE } from 'helpers/constant';
import { getNotificationsApi, createNotificationApi } from 'helpers/notificationApi';


function* fetchNotifis() {
  const res = yield getNotificationsApi();
  if (res.status === API_STATUS_CODE.SUCCESS) {
    yield put(setNotifications(res.data.notifications));
  }
}

function* createNotifi(action) {

  console.log('create sag');

  const { notification } = action.payload;
  const res = yield createNotificationApi(notification);
  if (res.status === API_STATUS_CODE.SUCCESS) {
    // DO NOTHING
  }
}

export default function* notificationSaga() {
  yield all([
    takeEvery(FETCH_NOTIFIS, fetchNotifis),
    takeEvery(CREATE_NOTIFI_SAGA, createNotifi)
  ])
}