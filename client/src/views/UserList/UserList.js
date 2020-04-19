import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable, CreateUser } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_USERS, usersSelector, createUserSaga } from 'state/modules/app/users/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = ({ users, onCreate }) => {
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
        <UsersTable users={users} />
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
  const usersStore = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
  }, [usersStore.status])

  const usersById = usersStore.byId || {};
  const users = Object.values(usersById);

  const createUser = (user) => {
    dispatch(createUserSaga(user));
  }

  return (
    <UserList
      onCreate={createUser}
      users={users}
    />
  )
}

export default UserListSmartComponent;
