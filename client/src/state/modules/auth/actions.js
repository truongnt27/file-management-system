export const namespace = 'auth';
export const Status = {
  INIT: 'INIT',
  AUTH_PROCESSING: 'PROCESSING',
  AUTH_SUCCESS: 'SUCCESS',
  AUTH_FAILED: 'FAILED',
}

export const AUTH_USER = `${namespace}/AUTH_USER`;
export const AUTH_USER_SUCCESS = `${namespace}/AUTH_USER_SUCCESS`;
export const AUTH_USER_FAILED = `${namespace}/AUTH_USER_FAILED`;

export const SIGN_OUT = `${namespace}/SIGN_OUT`;

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