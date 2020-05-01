import apiCaller from './apiCaller';

export const fetchUsersApi = () => {
  return apiCaller.get('/users');
}

export const getCurrentUser = () => {
  return apiCaller.get('/users/me');
}

export const createUserApi = (user) => {
  return apiCaller.post('/users', { user });
}

export const updateUserApi = (user) => {
  return apiCaller.put(`/users/${user._id}`, { user });
} 