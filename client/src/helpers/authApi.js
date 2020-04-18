import ApiCaller from './apiCaller';

export const authUserSocial = (provider) => {
  return ApiCaller.get(`/auth/${provider}`);
}

export const authUserLocal = (user) => {
  return ApiCaller.post('/auth/sign-in', user);
}

export const signOutApi = () => {
  return ApiCaller.get('/auth/sign-out');
}
