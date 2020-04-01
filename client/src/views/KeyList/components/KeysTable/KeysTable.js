import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { StatusBullet } from 'components'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const KeysTable = props => {
  const { className, keys, ...rest } = props;

  const classes = useStyles();

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { keys } = props;

    let selectedKeys;

    if (event.target.checked) {
      selectedKeys = keys.map(key => key.id);
    } else {
      selectedKeys = [];
    }

    setSelectedKeys(selectedKeys);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedKeys.indexOf(id);
    let newSelectedKeys = [];

    if (selectedIndex === -1) {
      newSelectedKeys = newSelectedKeys.concat(selectedKeys, id);
    } else if (selectedIndex === 0) {
      newSelectedKeys = newSelectedKeys.concat(selectedKeys.slice(1));
    } else if (selectedIndex === selectedKeys.length - 1) {
      newSelectedKeys = newSelectedKeys.concat(selectedKeys.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedKeys = newSelectedKeys.concat(
        selectedKeys.slice(0, selectedIndex),
        selectedKeys.slice(selectedIndex + 1)
      );
    }

    setSelectedKeys(newSelectedKeys);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedKeys.length === keys.length}
                      color="primary"
                      indeterminate={
                        selectedKeys.length > 0 &&
                        selectedKeys.length < keys.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Alias</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Creation Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys.slice(0, rowsPerPage).map(key => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={key.id}
                    selected={selectedKeys.indexOf(key.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedKeys.indexOf(key.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, key.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{key.alias}</TableCell>
                    <TableCell>{key.description || ''}</TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          size="sm"
                          type={key.status}
                        />
                        {key.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      {moment(key.creationDate).format('DD/MM/YYYY hh:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={keys.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

KeysTable.propTypes = {
  className: PropTypes.string,
  keys: PropTypes.array.isRequired
};

export default KeysTable;
