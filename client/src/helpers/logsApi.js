import apiCaller from './apiCaller';

export const getLogsApi = (fromDate, toDate) => {
  if (fromDate && toDate) {
    return apiCaller.get(`/logs?fromDate=${fromDate}&toDate=${toDate}`);
  }
  return apiCaller.get('/logs');
}