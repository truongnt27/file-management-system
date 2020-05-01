import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTableSmartComponent as UsersTable, CreateUser } from './components';
import { useDispatch } from 'react-redux';
import { createUserSaga } from 'state/modules/app/users/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = ({ onCreate }) => {
  const classes = useStyles();
  const [openCreatingDialog, setOpenCreatingDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenCreatingDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenCreatingDialog(false);
  }

  const handleOnCreate = (userInfo) => {
    setOpenCreatingDialog(false);
    onCreate && onCreate(userInfo);
  }

  return (
    <div className={classes.root}>
      <UsersToolbar onOpenDialog={handleOpenDialog} />
      <div className={classes.content}>
        <UsersTable />
      </div>
      <CreateUser
        onClose={handleCloseDialog}
        onCreate={handleOnCreate}
        open={openCreatingDialog}
      />
    </div>
  );
};

const UserListSmartComponent = () => {
  const dispatch = useDispatch();

  const createUser = (user) => {
    dispatch(createUserSaga(user));
  }

  return (
    <UserList
      onCreate={createUser}
    />
  )
}

export default UserListSmartComponent;
