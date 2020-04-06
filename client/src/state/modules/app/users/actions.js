export const namespace = 'users';

export const Status = {
  INIT: 'INIT',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
}

export const FETCH_USER = `${namespace}/FETCH_USER`;
export const FETCH_USER_SUCCESS = `${namespace}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAILED = `${namespace}/FETCH_USER_FAILED`;

export const SET_USERS = `${namespace}/SET_USERS`;
export const DEL_USERS = `${namespace}/DEL_USERS`;

export const setUsers = (users = []) => ({
  type: SET_USERS,
  payload: {
    users
  }
})

export const delUsers = (user = []) => ({
  type: DEL_USERS,
  payload: {
    user
  }
})

export const usersSelector = state => state[namespace];