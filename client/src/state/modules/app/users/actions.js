export const namespace = 'users';

export const Status = {
  INIT: 'INIT',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
}

export const FETCH_USERS = `${namespace}/FETCH_USERS`;
export const FETCH_USER_SUCCESS = `${namespace}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAILED = `${namespace}/FETCH_USER_FAILED`;

export const SET_USERS = `${namespace}/SET_USERS`;
export const DEL_USERS = `${namespace}/DEL_USERS`;
export const CREATE_USER = `${namespace}/CREATE_USER`;
export const CREATE_USER_SAGA = `${namespace}/CREATE_USER_SAGA`;

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

export const createUserSaga = (user) => ({
  type: CREATE_USER_SAGA,
  payload: {
    user
  }
})

export const setUser = (user) => ({
  type: CREATE_USER,
  payload: {
    user
  }
})


export const usersSelector = state => state[namespace];
export const getUserById = state => id => state[namespace].byId[id];
export const allIds = state => state[namespace].allIds;