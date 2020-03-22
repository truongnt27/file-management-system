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

import mockData from './data';

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

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const Logs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [events] = useState(mockData);

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
                    <TableCell>Event type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map(event => (
                    <TableRow
                      hover
                      key={event.id}
                    >
                      <TableCell>{event.agent.name}</TableCell>
                      <TableCell>{event.keyId}</TableCell>
                      <TableCell>
                        {moment(event.createdAt).format('DD/MM/YYYY hh:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          {event.type}
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
            count={events.length}
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