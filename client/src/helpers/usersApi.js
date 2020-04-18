import apiCaller from './apiCaller';

export const fetchUsersApi = () => {
  return apiCaller.get('/users');
}

export const getCurrentUser = () => {
  return apiCaller.get('/users/me');
}