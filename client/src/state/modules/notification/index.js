export const namespace = 'notification';

export const SHOW_TOAST = `${namespace}/SHOW_TOAST`;
export const HIDE_TOAST = `${namespace}/HIDE_TOAST`;
export const SHOW_LOADING = `${namespace}/SHOW_LOADING`;
export const HIDE_LOADING = `${namespace}/HIDE_LOADING`;

export const showToast = (toast) => ({
  type: SHOW_TOAST,
  payload: {
    toast
  }
})

export const toastSelector = state => state[namespace].toast;
export const loadingSelector = state => state[namespace].loading;

const initialState = {
  toast: {
    open: false,
    type: '',
    message: ''
  },
  loading: {
    open: false
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
    default:
      return state;
  }
}
