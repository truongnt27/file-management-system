import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Selectors, Actions } from 'state/modules/app/logs';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LastActivities = props => {
  const { className, onViewAll, ...rest } = props;

  const classes = useStyles();

  const logs = props.logs || [];
  const handleViewAll = () => {
    onViewAll && onViewAll();
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${logs.length} in total`}
        title="Latest activities"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {logs.map((log) => (
            <>
              <ListItem
                key={log._id}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={log.userId && log.userId.avatarPicture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={log.userId ? log.userId.fullname : '_'}
                  secondary={
                    <React.Fragment>
                      <Typography
                        color="textPrimary"
                        component="span"
                        variant="body2"
                      >
                        {log.description}
                      </Typography>
                      {` - at ${moment(log.time).format('DD/MM/YYYY hh:mm:ss')}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider
                component="li"
                variant="inset"
              />
            </>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          onClick={handleViewAll}
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LastActivities.propTypes = {
  className: PropTypes.string,
  logs: PropTypes.array.isRequired
};


const LastActivitiesSmartComponent = () => {
  const dispatch = useDispatch();
  const logsStore = useSelector(Selectors.logsStore);

  useEffect(() => {
    logsStore.status !== 'LOADED' && dispatch({ type: Actions.FETCH_LOGS });
  }, [logsStore.status])
  const logs = Object.values(logsStore.byId).slice(0, 6);

  const handleViewAll = () => {
    dispatch(push('/logs'));
  }
  return (
    <LastActivities
      logs={logs}
      onViewAll={handleViewAll}
    />
  )
}

export default LastActivitiesSmartComponent;
