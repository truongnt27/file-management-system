import apiCaller from './apiCaller';

export const getNotificationsApi = () => {
  return apiCaller.get('/noti');
}

export const createNotificationApi = (noti) => {
  return apiCaller.post('/noti', { notification: noti });
}