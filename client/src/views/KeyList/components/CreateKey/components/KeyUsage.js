import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { get } from 'lodash'
import PermissionSelector from './PermissionSelector';

import { isEmpty } from 'lodash'
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function KeyUsage(props) {
  const classes = useStyles();
  const { selectedUsers = [], keyInfo, onChange } = props;

  const handleOnChange = (selectedPermissions, userId) => {
    console.log(selectedPermissions, userId);

    onChange && onChange(selectedPermissions, userId)
  }

  return (
    <Paper>
      <Table
        aria-label="simple table"
        className={classes.table}
      >
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Role</TableCell>
            <TableCell >Permission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            !isEmpty(selectedUsers) && selectedUsers.map(user => (
              <TableRow key={user.username}>
                <TableCell
                  component="th"
                  scope="row"
                >
                  {user.fullname}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <PermissionSelector
                    onChange={handleOnChange}
                    selectedPermission={get(keyInfo, ['permissions', user._id], [])}
                    userId={user._id}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
