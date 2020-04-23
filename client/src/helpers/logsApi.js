import apiCaller from './apiCaller';

export const getLogsApi = (fromDate, toDate) => {

  return apiCaller.get(`/logs?fromDate=${fromDate}&toDate=${toDate}`);

}