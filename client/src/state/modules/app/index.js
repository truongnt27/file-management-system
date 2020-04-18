export const namespace = 'app';

export const BOOT = 'boot all the stuff needed to start the app';
export const BOOT_FINISHED = 'boot saga finished';

const initialState = {
  isBooting: false,
  bootDidFinish: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOT: {
      return {
        ...state,
        isBooting: true,
        bootDidFinish: false
      }
    }
    case BOOT_FINISHED: {
      return {
        ...state,
        isBooting: false,
        bootDidFinish: true
      }
    }
    default: {
      return state;
    }
  }
}

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options
});

export const bootFinished = () => ({
  type: BOOT_FINISHED
});

export const isBooting = state => state.app.isBooting;
export const bootDidFinish = state => state.app.bootDidFinish;
