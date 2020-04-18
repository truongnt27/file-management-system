import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_USERS, usersSelector, } from 'state/modules/app/users/actions';
import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const usersStore = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
  }, [usersStore.status])

  const usersById = usersStore.byId || {};
  const users = Object.values(usersById);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
