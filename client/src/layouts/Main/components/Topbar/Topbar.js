import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Popover
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { BaseList } from 'components';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, notifications, onSignout, ...rest } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    onSignout && onSignout();
  }
  const { displayNotifications, totalUnread } = notifications.reduce((acc, item) => {
    const { sender = {}, message = '', isRead, creationDate } = item;
    const avatarPicture = sender.avatarPicture || '';
    const primary = `${sender.fullname || ''} ${message}`;
    const secondary = moment(creationDate).fromNow();
    if (!isRead) acc.totalUnread++;
    acc.displayNotifications.push({
      avatarPicture,
      primary,
      secondary
    })
    return acc;
  }, {
    totalUnread: 0,
    displayNotifications: []
  })
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            color="inherit"
            onClick={handlePopoverOpen}
          >
            <Badge
              badgeContent={totalUnread}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon onClick={handleSignOut} />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {
          notifications.length > 0 &&
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            open={Boolean(anchorEl)}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <BaseList
              list={displayNotifications}
            />
          </Popover>
        }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.array,
  onSidebarOpen: PropTypes.func,
  onSignout: PropTypes.func
};

export default Topbar;
