import apiCaller from './apiCaller';

export const getLogsApi = () => {

  return apiCaller.get('/logs');

}