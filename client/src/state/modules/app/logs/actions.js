export const namespace = 'logs';

export const Status = {
  INIT: 'INIT',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
}

export const FETCH_LOGS = `${namespace}/FETCH_LOGS`;
export const FETCH_LOGS_SUCCESS = `${namespace}/FETCH_LOGS_SUCCESS`;
export const FETCH_LOGS_FAILED = `${namespace}/FETCH_LOGS_FAILED`;

export const SET_LOGS = `${namespace}/SET_LOGS`;

export const setLogs = (logs) => ({
  type: SET_LOGS,
  payload: {
    logs
  }
})

export const fetchLogs = (fromDate, toDate) => ({
  type: FETCH_LOGS,
  payload: {
    fromDate,
    toDate
  }
})
