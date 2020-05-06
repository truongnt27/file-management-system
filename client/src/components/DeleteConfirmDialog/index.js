import React from 'react';
import { bool, func, string } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField
} from '@material-ui/core'
function DeleteConfirmDialog(props) {
  const { item = '', onDelete, onClose, open } = props;

  const handleClose = () => {
    onClose && onClose();
  };
  const handleDelete = () => {
    onDelete && onDelete();
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to DELETE {item} ?

          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
            size="small"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleDelete}
            size="small"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DeleteConfirmDialog.propTypes = {
  item: string,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  open: bool.isRequired
}

export default DeleteConfirmDialog

