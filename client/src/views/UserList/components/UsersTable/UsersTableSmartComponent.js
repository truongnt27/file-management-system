import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_USERS, usersSelector, editUserSaga } from 'state/modules/app/users/actions';
import UsersTable from './UsersTable';

export const UsersTableSmartComponent = () => {
  const usersStore = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
  }, [usersStore.status])

  const usersById = usersStore.byId || {};
  const users = Object.values(usersById);

  const handleAssignRole = (user) => {
    dispatch(editUserSaga(user));
  }

  return (
    <UsersTable
      onAssignRole={handleAssignRole}
      users={users}
    />
  )
}

export default UsersTableSmartComponent;
