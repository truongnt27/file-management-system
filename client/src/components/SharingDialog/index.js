import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  List,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CompactUserInfo from '../CompactUserInfo';
import { UserAccessItem, AccessSelector } from './components';
import { updateFileSaga } from 'state/modules/app/files/actions';
import { getFileById } from 'state/modules/app/files/selector';
import { usersSelector } from 'state/modules/app/users/actions';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { cloneDeep, isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
  userAccessItem: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputContainer: {
    display: 'flex',
  },
  userSelector: {
    marginRight: theme.spacing(2)
  }
}));

export function SharingDialog(props) {
  const classes = useStyles();
  const { file, users, open, onClose, onChange } = props;
  const { owner, editors, viewers } = file;

  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selectedRole, setSelectedRole] = React.useState('viewers');

  const handleClose = () => {
    onClose && onClose();
  }

  const handleAccessChange = (id, value) => {
    const newFile = cloneDeep(file);

    const newEditors = editors.reduce((acc, user) => {
      if (user._id !== id) acc.push(user._id);
      return acc;
    }, []);

    const newViewers = viewers.reduce((acc, user) => {
      if (user._id !== id) acc.push(user._id);
      return acc;
    }, []);

    newFile.editors = newEditors;
    newFile.viewers = newViewers;

    if (value !== 'remove') {
      value && newFile[value].push(id);
    }
    onChange && onChange(newFile);
  }

  const handleSelectUsers = (e, values) => {
    const selectedIds = values.map(user => user._id);
    setSelectedUsers(selectedIds);
  }

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  }

  const handleShare = () => {
    const newFile = cloneDeep(file);
    const userIds = newFile[selectedRole].map(user => user._id);
    newFile[selectedRole] = [...userIds, ...selectedUsers];

    onChange && onChange(newFile);
    onClose && onClose();
  }

  return (
    <div >
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="form-dialog-title">Share file to people</DialogTitle>
        <DialogContent>
          <Typography >
            Who has access:
          </Typography>
          <List>
            {
              owner &&
              <div className={classes.userAccessItem}>
                <CompactUserInfo
                  fullname={owner.fullname}
                  profileImage={owner.avatarPicture}
                  subtitle={owner.email}
                />
                <Typography >
                  Owner
                </Typography>
              </div>
            }
            {
              editors.map(user =>
                <UserAccessItem
                  onChange={handleAccessChange}
                  role="editors"
                  user={user}
                />
              )
            }
            {
              viewers.map(user =>
                <UserAccessItem
                  onChange={handleAccessChange}
                  role="viewers"
                  user={user}
                />
              )
            }
          </List>
          <Typography >
            Share with:
          </Typography>
          <div className={classes.inputContainer}>
            <div
              className={classes.userSelector}
            >
              <Autocomplete
                getOptionLabel={(option) => option.email}
                id="tags-standard"
                multiple
                onChange={handleSelectUsers}
                options={users}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ width: '400px' }}
                    variant="standard"
                  />
                )}
              />
            </div>
            <AccessSelector
              onChange={handleSelectRole}
              role={selectedRole}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleShare}
            variant="contained"
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const SharingDialogSmartComponent = ({ fileId, open, onClose }) => {
  const file = useSelector(state => getFileById(state)(fileId));
  const usersStore = useSelector(usersSelector);
  const dispatch = useDispatch();

  const handleChange = (newFile) => {
    dispatch(updateFileSaga(newFile));
  }
  const users = Object.values(usersStore.byId);
  return (
    !isEmpty(file) && !isEmpty(users) &&
    <SharingDialog
      file={file}
      onChange={handleChange}
      onClose={onClose}
      open={open}
      users={users}
    />
  )
}

export default SharingDialogSmartComponent;