import React from 'react';
import { array } from 'prop-types';
import { useDispatch } from 'react-redux';
import { editUserSaga } from 'state/modules/app/users/actions';
import UsersTable from './UsersTable';

export const UsersTableSmartComponent = ({ users }) => {
  const dispatch = useDispatch();

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
UsersTableSmartComponent.propTypes = {
  users: array.isRequired
}
export default UsersTableSmartComponent;
