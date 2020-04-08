import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead
} from '@material-ui/core'

import GroupManagementBadge from 'components/GroupManagment/GroupManagementBadge';

import { isEmpty } from 'lodash';

function KeysTableViewer(props) {
  const { selectedKey, selectedUsers } = props;

  return (
    <Table
      aria-label="simple table"
    // className={classes.table}
    >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell >Email</TableCell>
          <TableCell >Role</TableCell>
          <TableCell >Permission</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          !isEmpty([selectedKey, selectedUsers]) ? selectedUsers.map(user => (
            <TableRow key={user._id}>
              <TableCell
                component="th"
                scope="row"
              >
                {user.fullname}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>
                {
                  selectedKey.permissions[user._id].map(name => {
                    return (
                      <GroupManagementBadge
                        names={[name]}
                      />
                    )
                  })
                }
              </TableCell>
            </TableRow>
          )) :
            <TableRow >
              <TableCell
                component="th"
                scope="row"
              />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
        }
      </TableBody>
    </Table>
  )
}

KeysTableViewer.propTypes = {
  selectedKey: PropTypes.array.isRequired,
  selectedUsers: PropTypes.array.isRequired
}

export default KeysTableViewer;

