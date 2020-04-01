import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { Selectors } from 'state/modules/auth';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));


function genAvatorImg(name) {
  const avatarColors = ['#1C1C84', '#283258', '#1A6A8E', '#4AB1B5'];
  const initial = name.match(/\b\w/g);
  console.log(initial);

  const displayName = `${initial[0]}${initial.length > 1 ? initial[initial.length - 1] : ''}`.toUpperCase();
  const backgroundColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return {
    displayName,
    backgroundColor
  }
}

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const user = useSelector(Selectors.currentUser);

  const { displayName, backgroundColor } = useMemo(() => genAvatorImg(user.fullname), [user.fullname]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatarPicture}
        style={{ backgroundColor }}
        to="/settings"
      >
        {displayName}
      </Avatar>
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.fullname}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
