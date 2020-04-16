import apiCaller from './apiCaller';

export const fetchUsersApi = () => {
  return apiCaller.get('/users');
}