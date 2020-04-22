import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Card,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';

import { Selectors, Actions } from 'state/modules/app/logs';

import { useDispatch, useSelector } from 'react-redux';
import TableToolbar from './TableToolbar'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',

  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Logs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const logsStore = useSelector(Selectors.logsStore);

  useEffect(() => {
    logsStore.status !== 'LOADED' && dispatch({ type: Actions.FETCH_LOGS });
  }, [logsStore.status])

  const logs = Object.values(logsStore.byId);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Button
        color="primary"
        style={{ marginBottom: '15px' }}
        variant="contained"
      >Export</Button>
      <Paper >
        <TableToolbar />
        <Card >
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sortDirection="desc">
                        <Tooltip
                          enterDelay={300}
                          title="Sort"
                        >
                          <TableSortLabel
                            active
                            direction="desc"
                          >
                            Time
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map(log => (
                      <TableRow
                        hover
                        key={log._id}
                      >
                        <TableCell>
                          {moment(log.time).format('DD/MM/YYYY hh:mm:ss')}
                        </TableCell>
                        <TableCell>{log.userId ? log.userId.fullname : '__'}</TableCell>
                        <TableCell>{log.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <Divider />
        </Card>
      </Paper>
    </div>
  );
};

Logs.propTypes = {
  className: PropTypes.string
};

export default Logs;