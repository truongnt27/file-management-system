import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { Selectors } from 'state/modules/auth';
import genAvataImg from 'helpers/genAvataImg';

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


const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const user = useSelector(Selectors.currentUser);

  const { displayName, backgroundColor } = useMemo(() => genAvataImg(user.fullname), [user.fullname]);

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
        to="/account"
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
