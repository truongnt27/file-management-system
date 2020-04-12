import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Selectors, Actions } from 'state/modules/app/logs';

import { useDispatch, useSelector } from 'react-redux';

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
    logsStore.status !== 'LOADED' && dispatch(Actions.FETCH_LOGS);
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
      <Card >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Actor</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip
                        enterDelay={300}
                        title="Sort"
                      >
                        <TableSortLabel
                          active
                          direction="desc"
                        >
                          Date time
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map(log => (
                    <TableRow
                      hover
                      key={log._id}
                    >
                      <TableCell>{log.agent.name}</TableCell>
                      <TableCell>{log.keyId}</TableCell>
                      <TableCell>
                        {moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          {log.type}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={logs.length}
            rowsPerPageOptions={[50, 100, 200]}
          />
        </CardActions>
      </Card>
    </div>

  );
};

Logs.propTypes = {
  className: PropTypes.string
};

export default Logs;