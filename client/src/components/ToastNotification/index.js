import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { toastSelector, HIDE_TOAST } from 'state/modules/notification';
import { TOAST_TYPE } from 'helpers/constant';

const listColor = {
  [TOAST_TYPE.FAILED]: '#ff0000',
  [TOAST_TYPE.SUCCESS]: '#2196F3',
  [TOAST_TYPE.WARNING]: '#FF5B28'
};

const ToastNotification = () => {

  const toast = useSelector(toastSelector);
  const dispatch = useDispatch();
  const { open = false, message = '' } = toast;

  const handleClose = () => {
    dispatch({ type: HIDE_TOAST });
  }
  return (
    <div >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={4000}
        onClose={handleClose}
        open={open}
      >
        <SnackbarContent
          message={message}
        />
      </Snackbar>
    </div>
  )
}


export default ToastNotification
