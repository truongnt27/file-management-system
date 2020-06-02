export const namespace = 'notification';

export const Status = {
  INIT: 'INIT',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
}

export const SHOW_TOAST = `${namespace}/SHOW_TOAST`;
export const HIDE_TOAST = `${namespace}/HIDE_TOAST`;
export const SHOW_LOADING = `${namespace}/SHOW_LOADING`;
export const HIDE_LOADING = `${namespace}/HIDE_LOADING`;

export const FETCH_NOTIFIS = `${namespace}/FETCH_NOTIFIS`;
export const CREATE_NOTIFI_SAGA = `${namespace}/CREATE_NOTIFI_SAGA`;
export const CREATE_NOTIFI = `${namespace}/CREATE_NOTIFI`;
export const SET_NOTIFIS = `${namespace}/SET_NOTIFIS`;

export const createNotification = (notification = {}) => ({
  type: CREATE_NOTIFI,
  payload: {
    notification
  }
})

export const createNotificationSaga = (notification = {}) => ({
  type: CREATE_NOTIFI_SAGA,
  payload: {
    notification
  }
})

export const setNotifications = (notifications = []) => ({
  type: SET_NOTIFIS,
  payload: {
    notifications
  }
})

export const showToast = (toast) => ({
  type: SHOW_TOAST,
  payload: {
    toast
  }
})

export const toastSelector = state => state[namespace].toast;
export const loadingSelector = state => state[namespace].loading;
export const topbarNotifiSelector = state => state[namespace].topbarNotifi;

const initialState = {
  toast: {
    open: false,
    type: '',
    message: ''
  },
  loading: {
    open: false
  },
  topbarNotifi: {
    status: Status.INIT,
    data: []
  }
};

export const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case SHOW_TOAST: {
      const { toast } = action.payload
      return {
        ...state,
        toast: {
          ...state.toast,
          ...toast,
          open: true
        }
      }
    }
    case HIDE_TOAST: {
      return {
        ...state,
        toast: {
          ...state.toast,
          open: false
        }
      }
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: {
          open: true
        }
      }
    }
    case HIDE_LOADING: {
      return {
        ...state,
        loading: {
          open: false
        }
      }
    }
    case SET_NOTIFIS: {
      const { notifications = [] } = action.payload;
      return {
        ...state,
        topbarNotifi: {
          status: Status.LOADED,
          data: notifications
        }
      }
    }
    case CREATE_NOTIFI: {
      const { notification } = action.payload;
      return {
        ...state,
        topbarNotifi: {
          ...state.topbarNotifi,
          data: [...state.topbarNotifi.data, notification]
        }
      }
    }
    default:
      return state;
  }
}
