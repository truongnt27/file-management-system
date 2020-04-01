export const Status = {
  INIT: 'INIT',
  AUTH_PROCESSING: 'PROCESSING',
  AUTH_SUCCESS: 'SUCCESS',
  AUTH_FAILED: 'FAILED',
}

export const AUTH_USER = 'auth user';
export const AUTH_USER_SUCCESS = 'auth user success';
export const AUTH_USER_FAILED = 'auth user failed';

export const authSuccess = (user) => ({
  type: AUTH_USER_SUCCESS,
  payload: {
    user
  }
})

export const authUser = (provider, user) => ({
  type: AUTH_USER,
  payload: {
    provider,
    user
  }
})