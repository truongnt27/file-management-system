import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { AccountProfile, AccountDetails } from './components';

import { Selectors, Actions } from 'state/modules/auth';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const user = useSelector(Selectors.currentUser);
  if (!user.fullname) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile
            user={user}
          />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails
            user={user}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
