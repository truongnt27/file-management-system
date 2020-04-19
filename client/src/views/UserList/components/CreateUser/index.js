import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {
  Close as CloseIcon,
  AccountCircle,
  Email,
} from '@material-ui/icons';
import {
  Typography,
  IconButton,
  Dialog,
  Button,
  TextField,
  InputAdornment,
  MenuItem
} from '@material-ui/core';

import validate from 'validate.js';
import { USER_TYPES } from 'helpers/constant';

const schema = {
  fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      className={classes.root}
      disableTypography
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CreateUser(props) {
  const { open, onClose, onCreate } = props;
  const classes = {};

  const handleClose = () => {
    onClose(false);
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleCreateUser = () => {
    onCreate && onCreate(formState.values);
  }
  console.log(formState.isValid);


  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create user
        </DialogTitle>
        <DialogContent dividers>
          <form
            className={classes.form}
          >
            <TextField
              autoFocus
              className={classes.textField}
              error={hasError('fullname')}
              fullWidth
              helperText={
                hasError('fullname') ? formState.errors.fullname[0] : null
              }
              id="fullname"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              label="Fullname"
              margin="normal"
              name="fullname"
              onChange={handleChange}
              required
              type="text"
            />
            <TextField
              className={classes.textField}
              error={hasError('email')}
              fullWidth
              helperText={
                hasError('email') ? formState.errors.email[0] : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              label="Email address"
              margin="normal"
              name="email"
              onChange={handleChange}
              required
              type="text"
              value={formState.values.email || ''}
            />
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              id="password"
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              required
              type="password"
            />
            <TextField
              className={classes.textField}
              // defaultValue={USER_TYPES.USER}
              helperText={
                hasError('type') ? formState.errors.password[0] : null
              }
              id="outlined-select-currency"
              label="Type"
              margin="normal"
              name="type"
              onChange={handleChange}
              select
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              value={formState.values.type}
            >
              {
                Object.keys(USER_TYPES).map(option => (
                  <MenuItem
                    key={option}
                    value={USER_TYPES[option]}
                  >
                    {USER_TYPES[option]}
                  </MenuItem>
                ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            disabled={!formState.isValid}
            onClick={handleCreateUser}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}