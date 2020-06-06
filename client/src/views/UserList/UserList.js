import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTableSmartComponent as UsersTable, CreateUser } from './components';
import { createUserSaga } from 'state/modules/app/users/actions';
import { searchStringFromArr } from 'helpers/utils';
import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = ({ onCreate, users }) => {
  const classes = useStyles();
  const [openCreatingDialog, setOpenCreatingDialog] = useState(false);
  const [usersToDisplay, setUsersToDisplay] = useState(users);

  const handleSearch = (searchString) => {
    const usersToDisplay = searchStringFromArr(users, ['fullname', 'email'], searchString);
    setUsersToDisplay(usersToDisplay);
  }

  useEffect(() => {
    setUsersToDisplay(users);
  }, [users])

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
      <UsersToolbar
        onOpenDialog={handleOpenDialog}
        onSearch={handleSearch}
      />
      <div className={classes.content}>
        <UsersTable
          users={usersToDisplay}
        />
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

  const usersStore = useSelector(usersSelector);

  useEffect(() => {
    (usersStore.status === 'INIT') && dispatch({ type: FETCH_USERS });
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
